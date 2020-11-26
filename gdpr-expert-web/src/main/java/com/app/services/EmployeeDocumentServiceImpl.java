package com.app.services;

import com.app.persistence.repositories.EmployeeDocumentRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class EmployeeDocumentServiceImpl implements EmployeeDocumentService {

  private final EmployeeDocumentRepository employeeDocumentRepository;

  @Autowired
  public EmployeeDocumentServiceImpl(EmployeeDocumentRepository employeeDocumentRepository){
    this.employeeDocumentRepository = employeeDocumentRepository;
  }

  @Override
  public void removeEmployeeDocumentById(Long documentId) {
    employeeDocumentRepository.deleteById(documentId);

  }
  
}
