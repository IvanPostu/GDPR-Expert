package com.app.persistence.repositories;

import java.util.Optional;

import com.app.domain.entities.EmployeeEntity;

import org.springframework.data.repository.Repository;

public interface EmployeeRepository extends Repository<EmployeeEntity, Long> {
  
  // @Modifying
  // @Query("DELETE FROM EmployeeEntity WHERE employee_id=:id")
  // void deleteById(@Param("id") Long employeeId);

  Optional<EmployeeEntity> findById(Long employeeId);

  EmployeeEntity save(EmployeeEntity employeeEntity);

  EmployeeEntity update(EmployeeEntity employeeEntity);

  void deleteById(Long employeeId);

 
}
