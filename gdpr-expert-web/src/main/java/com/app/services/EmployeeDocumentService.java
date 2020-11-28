package com.app.services;

import java.util.List;
import java.util.Optional;

import com.app.domain.dto.EmployeeDocumentInfoDto;
import com.app.domain.entities.EmployeeDocumentEntity;

public interface EmployeeDocumentService {

  Optional<EmployeeDocumentEntity> getDocumentById(Long documentId);

  void removeEmployeeDocumentById(Long documentId);

  List<EmployeeDocumentInfoDto> getEmployeeDocuments(Long employeeId);
}
