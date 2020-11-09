package com.app.services;

import java.util.List;

import com.app.domain.entities.DepartmentEntity;

public interface DepartmentService {

  void addDepartment(DepartmentEntity departmentEntity);
  
  List<DepartmentEntity> getDepartmentsForOrganisation(
    Long organisationId, Long organisationOwnerId);

}
