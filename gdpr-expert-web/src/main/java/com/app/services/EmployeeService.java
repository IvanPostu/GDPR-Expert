package com.app.services;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.app.domain.dto.CreateEmployeeDto;
import com.app.domain.dto.UpdateEmployeeDto;
import com.app.domain.entities.EmployeeDocumentEntity;
import com.app.domain.entities.EmployeeEntity;

import org.springframework.web.multipart.MultipartFile;

public interface EmployeeService {
  
  EmployeeEntity addEmployee(CreateEmployeeDto employee);

  List<EmployeeEntity> employeesForDepartment(Long departmentId);
  
  void updateEmployee(UpdateEmployeeDto employeeDto);

  void removeEmployee(Long employeeId);

  Optional<EmployeeEntity> getEmployee(Long employeeId);

  void addDocumentsToEmployee(Long employeeId, MultipartFile[] files);

  EmployeeDocumentEntity getDocument(Long employeeId, Long documentId);

  Collection<EmployeeDocumentEntity> documentsForEmployee(Long employeeId);

}
