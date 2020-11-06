package com.app.rest;

import java.time.LocalDateTime;

import com.app.domain.dto.CreateOrganisationDto;
import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.UserEntity;
import com.app.services.OrganisationService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/organisation")
public class OrganisationRestController {
  private static final Logger logger = LogManager.getLogger(OrganisationRestController.class);
  
  private final OrganisationService organisationService;

  @Autowired
  public OrganisationRestController(OrganisationService organisationService){
    this.organisationService = organisationService;
  }

  @RequestMapping(value = "/create", method = RequestMethod.POST, 
    consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> createOrganisation(
    @RequestBody CreateOrganisationDto organisationDto, 
    @AuthenticationPrincipal UserEntity user
  ){
    
    OrganisationEntity organisationEntity = new OrganisationEntity();
    organisationEntity.setActive(true);
    organisationEntity.setAddress(organisationDto.getAddress());
    organisationEntity.setAdministrator(organisationDto.getLegalRepresentative());
    organisationEntity.setCreatedAt(LocalDateTime.now());
    organisationEntity.setEmail(organisationDto.getEmail());
    organisationEntity.setLegalForm(organisationDto.getLegalForm());
    organisationEntity.setName(organisationDto.getOrganisationName());
    organisationEntity.setPhoneNumber(organisationDto.getTelephone());

    organisationService.addOrganisation(organisationEntity);

    logger.info(String.format("Created organisation with id %d.", organisationEntity.getId()));
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }


}
