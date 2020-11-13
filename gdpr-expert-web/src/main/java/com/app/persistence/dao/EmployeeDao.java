package com.app.persistence.dao;

import com.app.domain.entities.EmployeeEntity;

public interface EmployeeDao {
  
  void addEmployee(EmployeeEntity employeeEntity);
  
  void removeEmployee(Long employeeId);
}
