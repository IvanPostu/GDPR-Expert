package com.app.persistence.dao;

import com.app.domain.entities.DepartmentEntity;

public interface DepartmentDao {
  void addDepartment(DepartmentEntity departmentEntity);

  DepartmentEntity getById(Long departmentId);

  boolean deleteById(Long departmentId);

}
