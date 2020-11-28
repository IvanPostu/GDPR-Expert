package com.app.persistence.repositories;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.app.domain.entities.EmployeeEntity;

public class EmployeeRepositoryImpl implements EmployeeRepository {

  @PersistenceContext
  private EntityManager em;

  @Override
  public Optional<EmployeeEntity> findById(Long employeeId) {

    Map<String, Object> properties = new HashMap<>();
    EntityGraph<?> entityGraph = em.getEntityGraph("employee-department-entity-graph");
    properties.put("javax.persistence.fetchgraph", entityGraph);

    EmployeeEntity employee = em.find(EmployeeEntity.class, employeeId, properties);

    return Optional.of(employee);
  }

  @Override
  public EmployeeEntity save(EmployeeEntity employeeEntity) {

    em.persist(employeeEntity);


    return employeeEntity;
  }


  @Override
  public EmployeeEntity update(EmployeeEntity employeeEntity) {

    em.merge(employeeEntity);


    return employeeEntity;
  }

  @Override
  public void deleteById(Long employeeId) {
    EmployeeEntity employeeEntity = em.find(EmployeeEntity.class, employeeId);

    if (employeeEntity != null) {
      em.remove(employeeEntity);
    }

  }

}
