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

  @Transactional
  @Override
  public void deleteById(Long employeeId) {
    EmployeeEntity employeeEntity = em.find(EmployeeEntity.class, employeeId);

    if (employeeEntity != null) {
      // for(EmployeeDocumentEntity d : employeeEntity.getEmployeeDocuments()){
      //   em.remove(d);
      // }

      em.remove(employeeEntity);
    }else{
      throw new EntityNotFoundException(String.format("EmployeeEntity with id: %d not found!", employeeId));
    }

  }

}
