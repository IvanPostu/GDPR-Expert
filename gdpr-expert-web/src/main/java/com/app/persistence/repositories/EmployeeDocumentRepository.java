package com.app.persistence.repositories;

import java.util.Collection;
import java.util.Optional;


import com.app.domain.entities.EmployeeDocumentEntity;

import org.springframework.data.repository.Repository;

public interface EmployeeDocumentRepository extends Repository<EmployeeDocumentEntity, Long> {
  
  void saveAll(Collection<EmployeeDocumentEntity> documentEntities);

  void deleteById(Long documentId);

  Collection<EmployeeDocumentEntity> getEmployeeDocuments(Long employeeId);

  Optional<EmployeeDocumentEntity> findById(Long documentId);

}
