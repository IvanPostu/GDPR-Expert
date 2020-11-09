package com.app.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

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

  @Override
  @Transactional
  public List<DepartmentEntity> getDepartmentsForOrganisation(Long organisationId, Long organisationOwnerId) {
    OrganisationEntity organisationEntity = organisationDao
      .findOrganisationByIdAndOwnerId(organisationId, organisationOwnerId);
    List<DepartmentEntity> departments = new ArrayList<>(organisationEntity.getDepatrments());

    return departments;
  }

  @Override
  @Transactional
  public void addDepartment(DepartmentEntity departmentEntity) {
    departmentDao.addDepartment(departmentEntity);
  }

}
