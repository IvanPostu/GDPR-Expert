package com.app.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.app.domain.dto.CreateEmployeeDto;
import com.app.domain.dto.UpdateEmployeeDto;
import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.EmployeeDocumentEntity;
import com.app.domain.entities.EmployeeEntity;
import com.app.persistence.repositories.DepartmentRepository;
import com.app.persistence.repositories.EmployeeDocumentRepository;
import com.app.persistence.repositories.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeRepository employeeRepository;
  private final DepartmentRepository departmentRepository;
  private final EmployeeDocumentRepository employeeDocumentRepository;

  @Autowired
  public EmployeeServiceImpl(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository,
      EmployeeDocumentRepository employeeDocumentRepository) {
    this.employeeRepository = employeeRepository;
    this.departmentRepository = departmentRepository;
    this.employeeDocumentRepository = employeeDocumentRepository;
  }

  @Transactional
  @Override
  public EmployeeEntity addEmployee(CreateEmployeeDto employeeDto) {
    EmployeeEntity employeeEntity = new EmployeeEntity();
    employeeEntity.setFirstName(employeeDto.getFirstName());
    employeeEntity.setLastName(employeeDto.getLastName());
    employeeEntity.setAddress(employeeDto.getAddress());
    employeeEntity.setEmail(employeeDto.getEmail());
    employeeEntity.setPhoneNumber(employeeDto.getPhoneNumber());
    employeeEntity.setPersonalDataResponsible(employeeDto.isPersonalDataResponsible());

    DepartmentEntity departmentEntity = departmentRepository.findById(employeeDto.getDepartmentId())
        .orElseThrow(() -> new RuntimeException());

    employeeEntity.setDepartment(departmentEntity);

    employeeRepository.save(employeeEntity);

    return employeeEntity;
  }

  @Transactional
  @Override
  public List<EmployeeEntity> employeesForDepartment(Long departmentId) {

    DepartmentEntity departmentEntity = departmentRepository.findById(departmentId)
        .orElseThrow(() -> new RuntimeException());
    List<EmployeeEntity> employees = new ArrayList<>(departmentEntity.getEmployees());

    return employees;
  }

  @Override
  public void removeEmployee(Long employeeId) {
    employeeRepository.deleteById(employeeId);
  }

  @Override
  public void updateEmployee(UpdateEmployeeDto employeeDto) {
    EmployeeEntity employeeFromDb = employeeRepository.findById(employeeDto.getId())
        .orElseThrow(() -> new RuntimeException());

    UpdateEmployeeDto e = employeeDto;
    employeeFromDb.setAddress(e.getAddress());
    employeeFromDb.setEmail(e.getEmail());
    employeeFromDb.setFirstName(e.getFirstName());
    employeeFromDb.setLastName(e.getLastName());
    employeeFromDb.setPhoneNumber(e.getPhoneNumber());
    employeeFromDb.setPersonalDataResponsible(e.isPersonalDataResponsible());

    employeeRepository.update(employeeFromDb);
  }

  @Override
  public Optional<EmployeeEntity> getEmployeeWithDepartment(Long employeeId) {

    EmployeeEntity e = employeeRepository.findById(employeeId)
      .orElseThrow(() -> new RuntimeException());

    return Optional.of(e);
  }

  @Override
  public void addDocumentsToEmployee(Long employeeId, MultipartFile[] files) {
    EmployeeEntity employeeFromDb = employeeRepository.findById(employeeId).orElseThrow(() -> new RuntimeException());

    final Date uploadedToThePlatformAt = new Date();

    List<EmployeeDocumentEntity> documents = new ArrayList<>(files.length);
    for (int i = 0; i < files.length; i++) {
      EmployeeDocumentEntity doc = new EmployeeDocumentEntity();
      try {
        doc.setDocumentData(files[i].getBytes());
      } catch (IOException e) {
        e.printStackTrace();
        throw new RuntimeException();
      }
      doc.setEmployeeId(employeeFromDb.getId());
      doc.setUploadedToThePlatformAt(uploadedToThePlatformAt);
      doc.setFileName(files[i].getOriginalFilename());
      documents.add(doc);
    }

    employeeDocumentRepository.saveAll(documents);
  }

}
