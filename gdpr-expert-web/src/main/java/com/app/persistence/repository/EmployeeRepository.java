package com.app.persistence.repository;

import com.app.domain.entities.EmployeeEntity;

public interface EmployeeRepository {
  
  EmployeeEntity findEmployeeById(Long employeeId);

}
