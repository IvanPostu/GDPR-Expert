package com.app.persistence.repositories;

import com.app.domain.entities.EmployeeEntity;

import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<EmployeeEntity, Long> {

 
}
