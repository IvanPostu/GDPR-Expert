package com.app.services;

import java.util.List;

import com.app.domain.dto.UpdateDepartmentDto;
import com.app.domain.entities.DepartmentEntity;

public interface DepartmentService {

  void addDepartment(DepartmentEntity departmentEntity);
  void updateDepartment(UpdateDepartmentDto departmentDto);
  void removeDepartment(Long departmentId);
  
  List<DepartmentEntity> getDepartmentsForOrganisation(
    Long organisationId, Long organisationOwnerId);

}
