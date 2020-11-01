package com.app.persistence.dao;

import java.util.List;

import com.app.domain.entities.UserRoleEntity;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRoleDaoImpl implements UserRoleDao {

  private static final Logger logger = LogManager.getLogger();

  private SessionFactory sessionFactory;

  @Autowired
  public void setSessionFactory(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }


  @Override
  public void addRole(UserRoleEntity role) {
    Session session = sessionFactory.getCurrentSession();
    session.persist(role);
    logger.info("Role successfully saved. Role info " + role.toString());
  }

  @Override
  public List<UserRoleEntity> getRolesByUserId(int userId) {
    // final String sqlStr = "FROM app.user_role WHERE username=:uname"; 
    // Session session = sessionFactory.getCurrentSession();
    // Transaction tx=session.beginTransaction();  
    // TypedQuery<UserEntity> query = session.createQuery(sqlStr);
    // query.setParameter("uname", username);
    // query.setMaxResults(1);

    return null;
  }
  
  

}
