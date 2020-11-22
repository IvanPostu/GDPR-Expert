package com.app.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.app.domain.dto.CreateEmployeeDto;
import com.app.domain.dto.UpdateEmployeeDto;
import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.EmployeeEntity;
import com.app.persistence.repositories.DepartmentRepository;
import com.app.persistence.repositories.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeRepository employeeRepository;
  private final DepartmentRepository departmentRepository;

  @Autowired
  public EmployeeServiceImpl(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
    this.employeeRepository = employeeRepository;
    this.departmentRepository = departmentRepository;
  }

  @Override
  @Transactional
  public EmployeeEntity addEmployee(CreateEmployeeDto employeeDto) {
    EmployeeEntity employeeEntity = new EmployeeEntity();
    employeeEntity.setFirstName(employeeDto.getFirstName());
    employeeEntity.setLastName(employeeDto.getLastName());
    employeeEntity.setAddress(employeeDto.getAddress());
    employeeEntity.setEmail(employeeDto.getEmail());
    employeeEntity.setPhoneNumber(employeeDto.getPhoneNumber());
    employeeEntity.setPersonalDataResponsible(employeeDto.isPersonalDataResponsible());

    DepartmentEntity departmentEntity = departmentRepository
      .findById(employeeDto.getDepartmentId())
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
  @Transactional
  public void removeEmployee(Long employeeId) {
    employeeRepository.deleteById(employeeId);
  }

  @Override
  @Transactional
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

    employeeRepository.save(employeeFromDb);
  }

  @Override
  @Transactional
  public Optional<EmployeeEntity> getEmployee(Long employeeId) {
    EmployeeEntity e = employeeRepository.findById(employeeId)
      .orElseThrow(() -> new RuntimeException());
    
    DepartmentEntity d = e.getDepartment();
    d.getName();

    return Optional.of(e);
  }

}
