package com.app.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import com.app.domain.dto.CreateEmployeeDto;
import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.EmployeeEntity;
import com.app.persistence.dao.DepartmentDao;
import com.app.persistence.dao.EmployeeDao;

import org.springframework.beans.factory.annotation.Autowired;

public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeDao employeeDao;
  private final DepartmentDao departmentDao;

  @Autowired
  public EmployeeServiceImpl(EmployeeDao employeeDao, DepartmentDao departmentDao) {
    this.employeeDao = employeeDao;
    this.departmentDao = departmentDao;
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

    DepartmentEntity departmentEntity = departmentDao.getById(employeeDto.getDepartmentId()).get();

    employeeEntity.setDepartment(departmentEntity);

    employeeDao.addEmployee(employeeEntity);

    return employeeEntity;
  }

  @Override
  @Transactional
  public List<EmployeeEntity> employeesForDepartment(Long departmentId) {
    
    DepartmentEntity departmentEntity = departmentDao.getById(departmentId).get();
    List<EmployeeEntity> employees = new ArrayList<>(departmentEntity.getEmployees());

    return employees;
  }

  @Override
  @Transactional
  public void removeEmployee(Long employeeId) {
    employeeDao.removeEmployee(employeeId);
  }
  
}
