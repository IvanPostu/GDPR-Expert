package com.app.persistence.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.app.domain.entities.EmployeeEntity;

import org.springframework.stereotype.Repository;

@Repository
public class EmployeeRepositoryImpl implements EmployeeRepository {
  @PersistenceContext
  private EntityManager em;

  @Override
  public EmployeeEntity findEmployeeById(Long employeeId) {
    em.getTransaction().begin();

    EmployeeEntity employee = em.find(EmployeeEntity.class, employeeId);
    
    em.getTransaction().commit();
    em.close();

    return employee;
  }

}
