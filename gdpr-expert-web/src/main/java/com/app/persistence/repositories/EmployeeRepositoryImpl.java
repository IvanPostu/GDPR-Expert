package com.app.persistence.repositories;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.EmployeeEntity;

public class EmployeeRepositoryImpl implements EmployeeRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public Optional<EmployeeEntity> findById(Long employeeId) {

    Map<String, Object> properties = new HashMap<>();
    EntityGraph<?> entityGraph = entityManager.getEntityGraph("employee-department-entity-graph");
    properties.put("javax.persistence.fetchgraph", entityGraph);

    EmployeeEntity employee = entityManager.find(EmployeeEntity.class, employeeId, properties);

    return Optional.ofNullable(employee);
  }

  @Transactional
  @Override
  public void save(EmployeeEntity employeeEntity) {
    entityManager.persist(employeeEntity);
  }

  @Transactional
  @Override
  public void update(EmployeeEntity employeeEntity) {
    entityManager.merge(employeeEntity);
  }

  @Transactional
  @Override
  public void removeById(Long employeeId) {
    EmployeeEntity employeeEntity = entityManager.find(EmployeeEntity.class, employeeId);

    if (employeeEntity != null) {
      entityManager.remove(employeeEntity);
    }else{
      throw new EntityNotFoundException(String.format("EmployeeEntity with id: %d not found!", employeeId));
    }

  }

  @Override
  public Long count() {
    final String hQuery = "SELECT COUNT(e.id) FROM EmployeeEntity e";
    Long count = (Long)entityManager.createQuery(hQuery).getSingleResult();

    return count;
  }


}
