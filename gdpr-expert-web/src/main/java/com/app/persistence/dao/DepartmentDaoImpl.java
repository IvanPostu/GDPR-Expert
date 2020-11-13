package com.app.persistence.dao;

import java.util.Optional;

import com.app.domain.entities.DepartmentEntity;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class DepartmentDaoImpl implements DepartmentDao {

  private static final Logger logger = LogManager.getLogger();

  private final SessionFactory sessionFactory;

  @Autowired
  public DepartmentDaoImpl(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }

  @Override
  public void addDepartment(DepartmentEntity departmentEntity) {
    Session session = sessionFactory.getCurrentSession();
    session.persist(departmentEntity);
    logger.info("Department successfully saved. Organisation info ");
  }

  @Override
  public Optional<DepartmentEntity> getById(Long departmentId) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public void deleteById(Long departmentId) {
    // TODO Auto-generated method stub

  }

  
}
