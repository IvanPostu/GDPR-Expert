package com.app.persistence.repositories;

import java.util.Optional;

import com.app.domain.entities.EmployeeEntity;
import org.springframework.data.repository.Repository;

public interface EmployeeRepository extends Repository<EmployeeEntity, Long> {

  Optional<EmployeeEntity> findById(Long employeeId);

  void save(EmployeeEntity employeeEntity);

  void update(EmployeeEntity employeeEntity);

  void removeById(Long employeeId);

  Long count();

}
