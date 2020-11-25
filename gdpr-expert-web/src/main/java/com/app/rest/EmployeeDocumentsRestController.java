package com.app.rest;

import java.io.IOException;

import com.app.domain.entities.UserEntity;
import com.app.services.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/api/employee/docs")
public class EmployeeDocumentsRestController {
  
  private final EmployeeService employeeService;

  @Autowired
  public EmployeeDocumentsRestController(EmployeeService employeeService){
    this.employeeService = employeeService;
  }


  @RequestMapping(value = "", method = RequestMethod.POST,
          consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> addNewEvent(
    @AuthenticationPrincipal UserEntity user,
    @RequestParam(required = false, value = "file")  MultipartFile[] files,
    @RequestParam(required = false, value = "data")  String data
  ) throws IOException {
  
    return ResponseEntity.status(HttpStatus.OK).body("qq");
  }


}
