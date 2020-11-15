package com.app.rest;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.NoResultException;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import com.app.beans.ApplicationDateFormatter;
import com.app.beans.ApplicationDateTimeFormatter;
import com.app.domain.dto.CreateOrganisationDto;
import com.app.domain.dto.UpdateOrganisationDto;
import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.OrganisationLogoEntity;
import com.app.domain.entities.UserEntity;
import com.app.services.OrganisationService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/organisation")
public class OrganisationRestController {
  private static final Logger logger = LogManager.getLogger(OrganisationRestController.class);

  private final OrganisationService organisationService;
  private final ApplicationDateTimeFormatter dateTimeFormatter;
  private final ApplicationDateFormatter dateFormatter;

  @Autowired
  public OrganisationRestController(OrganisationService organisationService,
      ApplicationDateTimeFormatter dateTimeFormatter, ApplicationDateFormatter dateFormatter) {
    this.organisationService = organisationService;
    this.dateTimeFormatter = dateTimeFormatter;
    this.dateFormatter = dateFormatter;
  }

  /**
   * 
   * @param user
   * @param organisationDto
   * @return onsuccess id
   * @return onerror { empty_address empty_name invalid_email empty_telephone
   *         empty_representative }
   */
  @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> createOrganisation(@AuthenticationPrincipal UserEntity user,
      @RequestBody CreateOrganisationDto organisationDto) {

    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
    Set<ConstraintViolation<CreateOrganisationDto>> violations = validator.validate(organisationDto);

    if (violations.size() > 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(violations);
    }

    Date orgFoundedAt = new Date();
    try {
      orgFoundedAt = dateFormatter.getApplicationDateFormat().parse(organisationDto.getFoundedAt());
    } catch (ParseException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(String.format("Server date format is %s", dateFormatter.getApplicationDateFormat().toPattern()));
    }

    OrganisationEntity organisationEntity = new OrganisationEntity();
    organisationEntity.setActive(true);
    organisationEntity.setAddress(organisationDto.getAddress());
    organisationEntity.setAdministrator(organisationDto.getLegalRepresentative());
    organisationEntity.setCreatedOnPlatformAt(LocalDateTime.now());
    organisationEntity.setFoundedAt(orgFoundedAt);
    organisationEntity.setEmail(organisationDto.getEmail());
    organisationEntity.setLegalForm(organisationDto.getLegalForm());
    organisationEntity.setName(organisationDto.getOrganisationName());
    organisationEntity.setPhoneNumber(organisationDto.getTelephone());
    organisationEntity.setDescription(organisationDto.getDescription());
    organisationEntity.setOwner(user);

    if (!StringUtils.isEmpty(organisationDto.getBase64LogoImage())) {
      OrganisationLogoEntity logoEntity = new OrganisationLogoEntity();
      logoEntity.setImageData(organisationDto.getBase64LogoImage().getBytes());

      organisationEntity.setOrganisationLogoEntity(logoEntity);
    }

    organisationService.addOrganisation(organisationEntity);

    logger.info(String.format("Created organisation with id %d.", organisationEntity.getId()));
    return ResponseEntity.status(HttpStatus.CREATED).body(organisationEntity.getId());
  }

  @RequestMapping( method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> updateOrganisation(@AuthenticationPrincipal UserEntity user,
      @RequestBody UpdateOrganisationDto organisationDto) throws ParseException {

    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
    Set<ConstraintViolation<CreateOrganisationDto>> violations = validator
      .validate(organisationDto);

    if (violations.size() > 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(violations);
    }

    organisationService.updateOrganisation(organisationDto, user.getId());

    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @RequestMapping(value = "/all", method = RequestMethod.GET)
  public ResponseEntity<?> getAllOrganisations(@AuthenticationPrincipal UserEntity user) {
    Set<OrganisationEntity> userOrgList = organisationService.findOrganisationsByOwnerId(user.getId(), true);

    List<Map<String, Object>> response = new ArrayList<>(userOrgList.size());

    for (OrganisationEntity org : userOrgList) {
      Map<String, Object> item = new HashMap<>();
      item.put("organisationName", org.getName());
      item.put("organisationId", org.getId());
      item.put("organisationLogo", "");
      item.put("organisationCreatedOnPlatformDateTime",
          org.getCreatedOnPlatformAt().format(dateTimeFormatter.getApplicationDateTimeFormat()));
      item.put("organisationFoundedDate", dateFormatter.getApplicationDateFormat().format(org.getFoundedAt()));
      item.put("organisationDescription", org.getDescription());

      if (org.getOrganisationLogoEntity() != null) {
        byte[] imgBytes = org.getOrganisationLogoEntity().getImageData();
        item.put("organisationLogo", new String(imgBytes));
      }

      response.add(item);
    }

    return ResponseEntity.ok(response);
  }

  @RequestMapping(value = "/info/{id}", method = RequestMethod.GET)
  public ResponseEntity<?> organisationInfo(@PathVariable("id") Long organisationId,
      @AuthenticationPrincipal UserEntity user) {

    OrganisationEntity organisationEntity = null;

    try {
      organisationEntity = organisationService.findOrganisationByIdAndOwnerId(organisationId, user.getId(), true).get();
    } catch (NoResultException e) {
      return ResponseEntity.noContent().build();
    }

    Map<String, Object> response = new HashMap<>();
    response.put("organisationName", organisationEntity.getName());
    response.put("organisationId", organisationEntity.getId());
    response.put("organisationLogo", "");
    response.put("organisationCreatedOnPlatformDateTime",
        organisationEntity.getCreatedOnPlatformAt().format(dateTimeFormatter.getApplicationDateTimeFormat()));
    response.put("organisationFoundedDate",
        dateFormatter.getApplicationDateFormat().format(organisationEntity.getFoundedAt()));
    response.put("organisationDescription", organisationEntity.getDescription());
    response.put("organisationLegalForm", organisationEntity.getLegalForm());
    response.put("organisationAdministrator", organisationEntity.getAdministrator());
    response.put("organisationAddress", organisationEntity.getAddress());
    response.put("organisationPhoneNumber", organisationEntity.getPhoneNumber());
    response.put("organisationEmail", organisationEntity.getEmail());
    response.put("organisationDepartmentCount", 9);
    response.put("organisationEmployeeCount", 78);

    if (organisationEntity.getOrganisationLogoEntity() != null) {
      byte[] imgBytes = organisationEntity.getOrganisationLogoEntity().getImageData();
      response.put("organisationLogo", new String(imgBytes));
    }

    return ResponseEntity.ok(response);
  }

  @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<?> deleteOrganisation(@PathVariable("id") Long organisationId,
      @AuthenticationPrincipal UserEntity user) {

    try{
      boolean deletedWithSuccess = organisationService.deleteById(organisationId, user.getId());
      if(deletedWithSuccess){
        return ResponseEntity.status(HttpStatus.OK).build();
      }else{
        throw new Exception();
      }
    }catch(Exception e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
  }

}
