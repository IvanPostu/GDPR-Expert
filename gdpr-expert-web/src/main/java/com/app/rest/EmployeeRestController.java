package com.app.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Validator;

import com.app.domain.dto.CreateEmployeeDto;
import com.app.domain.dto.UpdateEmployeeDto;
import com.app.domain.entities.EmployeeEntity;
import com.app.domain.entities.UserEntity;
import com.app.services.EmployeeService;

import javax.validation.Validation;

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
@RequestMapping(value = "/api/employee")
public class EmployeeRestController {

  private final EmployeeService employeeService;

  @Autowired
  public EmployeeRestController(EmployeeService employeeService){
    this.employeeService = employeeService;
  }

  @RequestMapping( value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<?> getEmployee(@AuthenticationPrincipal UserEntity user,
    @PathVariable("id") Long employeeId) {
    

    EmployeeEntity e = employeeService.getEmployee(employeeId);
    Map<String, Object> result = new HashMap<>();
    result.put("id", e.getId());
    result.put("firstName", e.getFirstName());
    result.put("lastName", e.getLastName());
    result.put("email", e.getEmail());
    result.put("address", e.getAddress());
    result.put("phoneNumber", e.getPhoneNumber());
    result.put("personalDataResponsible", e.isPersonalDataResponsible());

    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  @RequestMapping( method = RequestMethod.PUT)
  public ResponseEntity<?> updateEmployee(@AuthenticationPrincipal UserEntity user,
    @RequestBody UpdateEmployeeDto updateEmployeeDto) {
    
    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    List<String> errorMessages = validator
      .validate(updateEmployeeDto)
      .stream()
      .map(a -> a.getMessage())
      .collect(Collectors.toList());

    if (errorMessages.size() > 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
    }

    employeeService.updateEmployee(updateEmployeeDto);

    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @RequestMapping(value = "/department/{id}", method = RequestMethod.GET)
  public ResponseEntity<?> getEmployeesByDepartmentId(@AuthenticationPrincipal UserEntity user,
    @PathVariable("id") Long departmentId) {

    List<EmployeeEntity> employees = employeeService.employeesForDepartment(departmentId);
    List<HashMap<String, Object>> response = new ArrayList<>(employees.size());

    employees.forEach( e -> {
      HashMap<String, Object> item = new HashMap<>();
      item.put("id", e.getId());
      item.put("firstName", e.getFirstName());
      item.put("lastName", e.getLastName());
      item.put("email", e.getEmail());
      item.put("address", e.getAddress());
      item.put("phoneNumber", e.getPhoneNumber());
      item.put("personalDataResponsible", e.isPersonalDataResponsible());
      response.add(item);
    });
 
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> addEmployee(@AuthenticationPrincipal UserEntity user,
      @RequestBody CreateEmployeeDto employeeDto) {

    EmployeeEntity e = employeeService.addEmployee(employeeDto);

    return ResponseEntity.status(HttpStatus.CREATED).body(e.getId());
  }


  @RequestMapping(value = "/remove/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<?> removeEmployee(@AuthenticationPrincipal UserEntity user,
    @PathVariable("id") Long employeeId) {

    employeeService.removeEmployee(employeeId);

    return ResponseEntity.status(HttpStatus.OK).build();
  }

}
