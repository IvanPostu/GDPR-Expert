package com.app.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.app.domain.dto.UpdateDepartmentDto;
import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.OrganisationEntity;
import com.app.persistence.repositories.DepartmentRepository;
import com.app.persistence.repositories.OrganisationRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class DepartmentServiceImpl implements DepartmentService {

  private final DepartmentRepository departmentRepository;
  private final OrganisationRepository organisationRepository;

  @Autowired
  public DepartmentServiceImpl(DepartmentRepository departmentRepository,
      OrganisationRepository organisationRepository) {

    this.departmentRepository = departmentRepository;
    this.organisationRepository = organisationRepository;
  }

  @Transactional
  @Override
  public List<DepartmentEntity> getDepartmentsForOrganisation(Long organisationId, Long organisationOwnerId) {
    OrganisationEntity organisationEntity = organisationRepository
      .findOrganisationByIdAndOwnerId(organisationId, organisationOwnerId)
      .orElseThrow(() -> new RuntimeException());

    List<DepartmentEntity> departments = organisationEntity.getDepatrments();
    List<DepartmentEntity> newArr = new ArrayList<>(departments);

    return newArr;
  }

  @Transactional
  @Override
  public void addDepartment(DepartmentEntity departmentEntity) {
    departmentRepository.save(departmentEntity);
  }

  @Transactional
  @Override
  public void updateDepartment(UpdateDepartmentDto departmentDto) {
    DepartmentEntity department = departmentRepository.findById(departmentDto.getId())
      .orElseThrow(() -> new RuntimeException());

    department.setEmail(departmentDto.getEmail());
    department.setName(departmentDto.getName());
    department.setResponsible(departmentDto.getResponsiblePerson());
    department.setPhoneNumber(departmentDto.getPhoneNumber());

    departmentRepository.save(department);
  }

  @Transactional
  @Override
  public void removeDepartment(Long departmentId) {
   
    departmentRepository.deleteById(departmentId);
  }

  @Transactional
  @Override
  public Optional<DepartmentEntity> getDepartment(Long departmentId) {
    Optional<DepartmentEntity> department = departmentRepository.findById(departmentId);
    return department;
  }

}
