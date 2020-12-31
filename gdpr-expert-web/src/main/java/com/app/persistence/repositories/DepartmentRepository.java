package com.app.persistence.repositories;

import java.util.Optional;

import com.app.domain.entities.DepartmentEntity;
import org.springframework.data.repository.Repository;

public interface DepartmentRepository extends Repository<DepartmentEntity, Long> {
  
  void save(DepartmentEntity departmentEntity);

  void deleteById(Long departmentEntityId);

  Optional<DepartmentEntity> findById(Long departmentEntityId); 
  
  Long count();
}
