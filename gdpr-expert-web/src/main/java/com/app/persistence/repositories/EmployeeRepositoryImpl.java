package com.app.persistence.repositories;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import com.app.domain.entities.EmployeeEntity;

import org.springframework.beans.factory.annotation.Autowired;

public class EmployeeRepositoryImpl implements EmployeeRepository {

  private final EntityManagerFactory entityManagerFactory;

  @Autowired
  public EmployeeRepositoryImpl(EntityManagerFactory entityManagerFactory) {
    this.entityManagerFactory = entityManagerFactory;
  }

  @Override
  public Optional<EmployeeEntity> findById(Long employeeId) {
    EntityManager em = entityManagerFactory.createEntityManager();
    em.getTransaction().begin();

    Map<String, Object> properties = new HashMap<>();
    EntityGraph<?> entityGraph = em.getEntityGraph("employee-department-entity-graph");
    properties.put("javax.persistence.fetchgraph", entityGraph);

    EmployeeEntity employee = em.find(EmployeeEntity.class, employeeId, properties);

    em.getTransaction().commit();
    em.close();
    return Optional.of(employee);
  }

  @Override
  public EmployeeEntity save(EmployeeEntity employeeEntity) {
    EntityManager em = entityManagerFactory.createEntityManager();
    em.getTransaction().begin();

    em.persist(employeeEntity);

    em.getTransaction().commit();
    em.close();

    return employeeEntity;
  }

  @Override
  public EmployeeEntity update(EmployeeEntity employeeEntity) {
    EntityManager em = entityManagerFactory.createEntityManager();
    em.getTransaction().begin();

    em.merge(employeeEntity);

    em.getTransaction().commit();
    em.close();

    return employeeEntity;
  }

  @Override
  public void deleteById(Long employeeId) {
    EntityManager em = entityManagerFactory.createEntityManager();

    em.getTransaction().begin();
    EmployeeEntity employeeEntity = em.find(EmployeeEntity.class, employeeId);

    if (employeeEntity != null) {
      em.remove(employeeEntity);
    }

    em.getTransaction().commit();
    em.close();

  }

  // @Override
  // public Optional<EmployeeEntity> findEmployeeWithDocuments(Long employeeId) {
  //   EntityManager em = entityManagerFactory.createEntityManager();
  //   em.getTransaction().begin();

  //   Map<String, Object> properties = new HashMap<>();
  //   EntityGraph<EmployeeEntity> entityGraph = em.createEntityGraph(EmployeeEntity.class);
  //   entityGraph.addSubgraph("employeeDocuments")
  //     .addAttributeNodes("fileName");
    
  //   properties.put("javax.persistence.fetchgraph", entityGraph);

  //   EmployeeEntity employee = em.find(EmployeeEntity.class, employeeId, properties);
    

  //   em.getTransaction().commit();
  //   em.close();
  //   return Optional.of(employee);
  // }


}
