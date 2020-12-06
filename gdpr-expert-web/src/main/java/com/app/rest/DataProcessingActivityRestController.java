package com.app.rest;

import com.app.domain.entities.UserEntity;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/dataProcessingActivity")
public class DataProcessingActivityRestController {
  
  @RequestMapping(value = "/organisation/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> getDepartmentById(@PathVariable("id") Long organisationId,
      @AuthenticationPrincipal UserEntity user) {

    // DepartmentEntity d = departmentService.getDepartment(departmentId)
    //   .orElseThrow(() -> new RuntimeException());
      
    // HashMap<String, Object> result = new HashMap<>();
    // result.put("departmentId", d.getId());
    // result.put("departmentName", d.getName());
    // result.put("departmentEmail", d.getEmail());
    // result.put("departmentPhoneNumber", d.getPhoneNumber());
    // result.put("departmentCreatedAt", dateTimeFormatter.parse(d.getCreatedAt()));
    // result.put("departmentResponsiblePerson", d.getResponsible());

    return ResponseEntity.ok(null);
  }

}
