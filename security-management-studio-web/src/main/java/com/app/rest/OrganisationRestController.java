package com.app.rest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.app.beans.ApplicationDateFormatter;
import com.app.beans.ApplicationDateTimeFormatter;
import com.app.domain.dto.CreateOrganisationDto;
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
  public OrganisationRestController(
    OrganisationService organisationService,
    ApplicationDateTimeFormatter dateTimeFormatter,
    ApplicationDateFormatter dateFormatter
  ) {
    this.organisationService = organisationService;
    this.dateTimeFormatter = dateTimeFormatter;
    this.dateFormatter = dateFormatter;
  }

  @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> createOrganisation(
    @RequestBody CreateOrganisationDto organisationDto,
    @AuthenticationPrincipal UserEntity user
  ) 
  {

    OrganisationEntity organisationEntity = new OrganisationEntity();
    organisationEntity.setActive(true);
    organisationEntity.setAddress(organisationDto.getAddress());
    organisationEntity.setAdministrator(organisationDto.getLegalRepresentative());
    organisationEntity.setCreatedOnPlatformAt(LocalDateTime.now());
    organisationEntity.setFoundedAt(new Date());
    organisationEntity.setEmail(organisationDto.getEmail());
    organisationEntity.setLegalForm(organisationDto.getLegalForm());
    organisationEntity.setName(organisationDto.getOrganisationName());
    organisationEntity.setPhoneNumber(organisationDto.getTelephone());
    organisationEntity.setDescription(organisationDto.getDescription());
    organisationEntity.setOwner(user);

    
    if(!StringUtils.isEmpty(organisationDto.getBase64LogoImage())){
      OrganisationLogoEntity logoEntity = new OrganisationLogoEntity();
      byte[] imageBytes = organisationDto.getBase64LogoImage().getBytes();
      Byte[] imageForSave = new Byte[imageBytes.length];

      int index = 0;
      for(byte b : imageBytes){
        imageForSave[index++] = b;
      }

      logoEntity.setImageData(imageForSave);
     
      organisationEntity.setOrganisationLogoEntity(logoEntity);
    }
    
    organisationService.addOrganisation(organisationEntity);

    logger.info(String.format("Created organisation with id %d.", organisationEntity.getId()));
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @RequestMapping(value = "/all", method = RequestMethod.GET)
  public ResponseEntity<?> getAllOrganisations(@AuthenticationPrincipal UserEntity user) {
    Set<OrganisationEntity> userOrgList = organisationService.findOrganisationsByOwnerId(
      user.getId(), true);


    List<Map<String, Object>> response = new ArrayList<>(userOrgList.size());

    for (OrganisationEntity org : userOrgList){
      Map<String, Object> item = new HashMap<>();
      item.put("organisationName", org.getName());
      item.put("organisationId", org.getId());
      item.put("organisationLogo", "");
      item.put("organisationCreatedOnPlatformDateTime", org.getCreatedOnPlatformAt()
        .format(dateTimeFormatter.getApplicationDateTimeFormat())
      );
      item.put("organisationFoundedDate", dateFormatter
        .getApplicationDateFormat()
        .format(org.getFoundedAt())
      );

      if(org.getOrganisationLogoEntity() != null){
        Byte[] imgBytes = org.getOrganisationLogoEntity().getImageData();
        if(imgBytes.length > 0){
          StringBuilder imgBuilder = new StringBuilder(imgBytes.length);
          for(Byte b : imgBytes){
            imgBuilder.append((char)b.byteValue());
          }

          item.put("organisationLogo", imgBuilder.toString());
        }
      }
      item.put("organisationDescription", org.getDescription());

      response.add(item);
    }


    return ResponseEntity.ok(response);
  }

}
