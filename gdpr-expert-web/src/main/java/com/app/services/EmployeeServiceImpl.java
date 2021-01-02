package com.app.services;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.app.domain.dto.CreateEmployeeDto;
import com.app.domain.dto.EmployeeDataResponsibleQuestionDto;
import com.app.domain.dto.UpdateEmployeeDto;
import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.EmployeeDocumentEntity;
import com.app.domain.entities.EmployeeEntity;
import com.app.persistence.repositories.DepartmentRepository;
import com.app.persistence.repositories.EmployeeDocumentRepository;
import com.app.persistence.repositories.EmployeeRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ResourceUtils;
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
    employeeRepository.removeById(employeeId);
  }

  @Transactional
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

    EmployeeEntity e = employeeRepository.findById(employeeId).orElseThrow(() -> new RuntimeException());

    return Optional.of(e);
  }

  @Override
  public void addDocumentsToEmployee(Long employeeId, MultipartFile[] files) {
    EmployeeEntity employee = new EmployeeEntity();
    employee.setId(employeeId);

    final Date uploadedToThePlatformAt = new Date();

    List<EmployeeDocumentEntity> documents = new ArrayList<>(files.length);
    for (int i = 0; i < files.length; i++) {
      EmployeeDocumentEntity doc = new EmployeeDocumentEntity();
      try {
        doc.setDocumentDataBlob(files[i].getBytes());
      } catch (IOException e) {
        e.printStackTrace();
        throw new RuntimeException();
      }
      doc.setEmployee(employee);
      doc.setUploadedToThePlatformAt(uploadedToThePlatformAt);
      doc.setFileName(files[i].getOriginalFilename());
      documents.add(doc);
    }

    employeeDocumentRepository.saveAll(documents);
  }

  @Override
  public List<EmployeeDataResponsibleQuestionDto> getDataResponsibleQuestions() {
    ObjectMapper objectMapper = new ObjectMapper();

    String json = "";

    try {
      File file = ResourceUtils.getFile("classpath:gdpr/PersonalDataResponsibleQuestions.MD.json");
      json = Files.readAllLines(file.toPath(), StandardCharsets.UTF_8).stream().reduce("", (a, c) -> a + c);
    } catch (IOException e) {
      throw new RuntimeException("gdpr/PersonalDataResponsibleQuestions.MD.json IO error.!!!");
    }
 
    try {
      EmployeeDataResponsibleQuestionDto[] questions = objectMapper.readValue(json,
          EmployeeDataResponsibleQuestionDto[].class);

      return Arrays.asList(questions);
    } catch (JsonProcessingException e) {
      throw new RuntimeException("gdpr/PersonalDataResponsibleQuestions.MD.json invalid JSON.!!!");
    }

  }

}
