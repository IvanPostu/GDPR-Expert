package com.app.persistence.dao;

import com.app.domain.entities.EmployeeEntity;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class EmployeeDaoImpl implements EmployeeDao {
  private final SessionFactory sessionFactory;

  @Autowired
  public EmployeeDaoImpl(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }
  
  @Override
  public void addEmployee(EmployeeEntity employeeEntity) {
    Session session = sessionFactory.getCurrentSession();
    session.persist(employeeEntity);

  }

  @Override
  public void removeEmployee(Long employeeId) {
    Session session = sessionFactory.getCurrentSession();
    EmployeeEntity employee = session.load(EmployeeEntity.class, employeeId);

    if(employee != null){
      session.delete(employee);
    }
  }
  
}
