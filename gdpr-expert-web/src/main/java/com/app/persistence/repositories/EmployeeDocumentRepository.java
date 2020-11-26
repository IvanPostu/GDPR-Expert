package com.app.persistence.repositories;

import com.app.domain.entities.EmployeeDocumentEntity;

import org.springframework.data.repository.CrudRepository;

public interface EmployeeDocumentRepository extends CrudRepository<EmployeeDocumentEntity, Long> {
  
  // @Modifying
  // @Query("DELETE FROM EmployeeDocumentEntity WHERE employee_document_id=:id")
  // void deleteById(@Param("id") Long departmentId);
}
