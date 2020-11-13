package com.app.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.app.domain.dto.CreateEmployeeDto;
import com.app.domain.entities.EmployeeEntity;
import com.app.domain.entities.UserEntity;
import com.app.services.EmployeeService;

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
      item.put("pesonalDataResponsible", e.isPersonalDataResponsible());
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
