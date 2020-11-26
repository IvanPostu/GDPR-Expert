package com.app.persistence.repositories;

import com.app.domain.entities.EmployeeEntity;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends CrudRepository<EmployeeEntity, Long> {
  
  @Modifying
  @Query("DELETE FROM EmployeeEntity WHERE employee_id=:id")
  void deleteById(@Param("id") Long employeeId);
 
}
