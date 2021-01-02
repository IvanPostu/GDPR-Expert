package com.app.services;

import java.util.List;
import java.util.Optional;

import com.app.domain.dto.EmployeeDocumentInfoDto;
import com.app.domain.entities.EmployeeDocumentEntity;
import com.app.persistence.repositories.EmployeeDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class EmployeeDocumentServiceImpl implements EmployeeDocumentService {

  private final EmployeeDocumentRepository employeeDocumentRepository;

  @Autowired
  public EmployeeDocumentServiceImpl(EmployeeDocumentRepository employeeDocumentRepository) {
    this.employeeDocumentRepository = employeeDocumentRepository;
  }

  @Override
  public void removeEmployeeDocumentById(Long documentId) {
    employeeDocumentRepository.deleteById(documentId);

  }

  @Override
  public List<EmployeeDocumentInfoDto> getEmployeeDocuments(Long employeeId) {

    return null;
    //  employeeDocumentRepository.getEmployeeDocuments(employeeId).stream().map(a -> {
    //   EmployeeDocumentInfoDto res = new EmployeeDocumentInfoDto(a.getEmployeeDocumentId(), a.getFileName());

    //   return res;
    // }).collect(Collectors.toList());
  }

  @Override
  public Optional<EmployeeDocumentEntity> getDocumentById(Long documentId) {
    
    return employeeDocumentRepository.findById(documentId);
  }
  
}
