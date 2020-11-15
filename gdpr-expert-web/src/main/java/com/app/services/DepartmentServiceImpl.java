package com.app.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import com.app.domain.dto.UpdateDepartmentDto;
import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.OrganisationEntity;
import com.app.persistence.dao.DepartmentDao;
import com.app.persistence.dao.OrganisationDao;

import org.springframework.beans.factory.annotation.Autowired;

public class DepartmentServiceImpl implements DepartmentService {

  private final DepartmentDao departmentDao;
  private final OrganisationDao organisationDao;

  @Autowired
  public DepartmentServiceImpl(DepartmentDao departmentDao, OrganisationDao organisationDao) {
    this.departmentDao = departmentDao;
    this.organisationDao = organisationDao;
  }

  @Transactional
  @Override
  public List<DepartmentEntity> getDepartmentsForOrganisation(Long organisationId, Long organisationOwnerId) {
    OrganisationEntity organisationEntity = organisationDao.findOrganisationByIdAndOwnerId(organisationId,
        organisationOwnerId);
    List<DepartmentEntity> departments = new ArrayList<>(organisationEntity.getDepatrments());

    return departments;
  }

  @Transactional
  @Override
  public void addDepartment(DepartmentEntity departmentEntity) {
    departmentDao.addDepartment(departmentEntity);
  }

  @Transactional
  @Override
  public void updateDepartment(UpdateDepartmentDto departmentDto) {
    DepartmentEntity department = departmentDao.getById(departmentDto.getId());
    department.setEmail(departmentDto.getEmail());
    department.setName(departmentDto.getName());
    department.setResponsible(departmentDto.getResponsiblePerson());
    department.setPhoneNumber(departmentDto.getPhoneNumber());

    departmentDao.addDepartment(department);
  }

  @Transactional
  @Override
  public void removeDepartment(Long departmentId) {
    departmentDao.deleteById(departmentId);
  }

}
