package com.app.persistence.dao;

import java.util.Optional;

import com.app.domain.entities.DepartmentEntity;

public interface DepartmentDao {
  void addDepartment(DepartmentEntity departmentEntity);

  Optional<DepartmentEntity> getById(Long departmentId);

  void deleteById(Long departmentId);

}
