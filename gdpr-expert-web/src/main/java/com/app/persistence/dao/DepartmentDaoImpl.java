package com.app.persistence.dao;

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
  public DepartmentEntity getById(Long departmentId) {
    Session session = sessionFactory.getCurrentSession();
    DepartmentEntity departmentEntity = session.load(DepartmentEntity.class, departmentId);
    return departmentEntity;
  }

  @Override
  public boolean deleteById(Long departmentId) {
    Session session = sessionFactory.getCurrentSession();
    DepartmentEntity departmentEntity = session.load(DepartmentEntity.class, departmentId);
    boolean deleteWithSuccess = false;

    if(departmentEntity != null){
      session.delete(departmentEntity);
      deleteWithSuccess = true;
    }

    return deleteWithSuccess;
  }

  
}
