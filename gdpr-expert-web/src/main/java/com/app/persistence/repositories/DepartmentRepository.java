package com.app.persistence.repositories;

import com.app.domain.entities.DepartmentEntity;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface DepartmentRepository extends CrudRepository<DepartmentEntity, Long> {
  
  @Modifying
  @Query("DELETE FROM DepartmentEntity WHERE department_id=:depId")
  void deleteById(@Param("depId") Long departmentId);

}
