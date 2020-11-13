package com.app.rest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.app.beans.ApplicationDateTimeFormatter;
import com.app.domain.dto.CreateDepartment;
import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.UserEntity;
import com.app.services.DepartmentService;
import com.app.services.OrganisationService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/department")
public class DepartmentRestController {
  private static final Logger logger = LogManager.getLogger(DepartmentRestController.class);

  private final DepartmentService departmentService;
  private final OrganisationService organisationService;
  private final ApplicationDateTimeFormatter dateTimeFormatter;

  @Autowired
  public DepartmentRestController(DepartmentService departmentService, OrganisationService organisationService, ApplicationDateTimeFormatter dateTimeFormatter) {
    this.departmentService = departmentService;
    this.organisationService = organisationService;
    this.dateTimeFormatter = dateTimeFormatter;
  }

  @RequestMapping(value = "/organisation/{id}", method = RequestMethod.GET)
  public ResponseEntity<?> createOrganisation(@PathVariable("id") Long organisationId,
      @AuthenticationPrincipal UserEntity user) {

    List<DepartmentEntity> departments = departmentService.getDepartmentsForOrganisation(organisationId, user.getId());

    List<HashMap<String, Object>> response = new ArrayList<>(departments.size());
    for(DepartmentEntity d : departments){
      HashMap<String, Object> item = new HashMap<>();
      item.put("departmentName", d.getName());
      item.put("departmentEmail", d.getEmail());
      item.put("departmentPhoneNumber", d.getPhoneNumber());
      item.put("departmentCreatedAt", d.getCreatedAt().format(dateTimeFormatter.getApplicationDateTimeFormat()));
      item.put("departmentId", d.getId());
      item.put("departmentResponsiblePerson", d.getResponsible());
      response.add(item);
    }

    logger.info(String.format("Get departments, list size %d", departments.size()));

    return ResponseEntity.ok(response);
  }

  @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> createOrganisation(@RequestBody CreateDepartment departmentDto,
      @AuthenticationPrincipal UserEntity user) {

    
    OrganisationEntity organisationEntity = organisationService
      .findOrganisationByIdAndOwnerId(departmentDto.getOrganisationId(), user.getId(), false)
      .get();

    DepartmentEntity departmentEntity = new DepartmentEntity();
    departmentEntity.setActive(true);
    departmentEntity.setCreatedAt(LocalDateTime.now());
    departmentEntity.setEmail(departmentDto.getEmail());
    departmentEntity.setName(departmentDto.getName());
    departmentEntity.setPhoneNumber(departmentDto.getPhoneNumber());
    departmentEntity.setResponsible(departmentDto.getResponsiblePerson());
    departmentEntity.setOrganisation(organisationEntity);

    departmentService.addDepartment(departmentEntity);
 
    logger.info(String.format("Created department with id %d.", departmentEntity.getId()));
    return ResponseEntity.status(HttpStatus.CREATED).body(departmentEntity.getId());
  }

}
