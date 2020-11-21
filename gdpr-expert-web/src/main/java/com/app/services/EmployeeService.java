package com.app.services;

import java.util.List;

import com.app.domain.dto.CreateEmployeeDto;
import com.app.domain.dto.UpdateEmployeeDto;
import com.app.domain.entities.EmployeeEntity;

public interface EmployeeService {
  
  EmployeeEntity addEmployee(CreateEmployeeDto employee);

  List<EmployeeEntity> employeesForDepartment(Long departmentId);
  
  void updateEmployee(UpdateEmployeeDto employeeDto);

  void removeEmployee(Long employeeId);

  EmployeeEntity getEmployee(Long employeeId);

}
