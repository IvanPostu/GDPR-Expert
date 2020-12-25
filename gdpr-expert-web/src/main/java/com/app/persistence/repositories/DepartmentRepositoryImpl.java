package com.app.persistence.repositories;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.DepartmentEntity;

public class DepartmentRepositoryImpl implements DepartmentRepository {
  @PersistenceContext
  private EntityManager entityManager;
  
  @Transactional
  @Override
  public void save(DepartmentEntity departmentEntity) {
    entityManager.persist(departmentEntity);
  }

  @Transactional
  @Override
  public void deleteById(Long departmentEntityId) {
    entityManager.createQuery("DELETE FROM DepartmentEntity WHERE department_id=:depId")
      .setParameter("depId", departmentEntityId)
      .executeUpdate();
  }

  @Override
  public Optional<DepartmentEntity> findById(Long departmentEntityId) {
    DepartmentEntity department = entityManager.find(DepartmentEntity.class, departmentEntityId);

    return Optional.ofNullable(department);
  }

  @Transactional
  @Override
  public void deleteAll() {
    entityManager.createQuery("DELETE FROM DepartmentEntity")
      .executeUpdate();
  }
  
}
