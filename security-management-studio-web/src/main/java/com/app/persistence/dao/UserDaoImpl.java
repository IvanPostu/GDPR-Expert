
package com.app.persistence.dao;


import java.util.List;

import javax.persistence.TypedQuery;

import com.app.domain.entities.UserEntity;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {

  private static final Logger logger = LogManager.getLogger();

  private SessionFactory sessionFactory;

  @Autowired
  public void setSessionFactory(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }

  @Override
  public void addUser(UserEntity user) {
    Session session = sessionFactory.getCurrentSession();
    session.persist(user);
    logger.info("User successfully saved. User info " + user.toString());
  }

  @Override
  public void updateUser(UserEntity user) {
    Session session = sessionFactory.getCurrentSession();
    session.update(user);
    logger.info("User successfully updated. User info " + user.toString());
  }

  @Override
  public void removeUser(Long id) {
    Session session = sessionFactory.getCurrentSession();
    UserEntity user = session.load(UserEntity.class, id);
    
    if(user!=null){
      session.delete(user);
    }

    logger.info("User successfully deleted. User info " + user.toString());
  }

  @SuppressWarnings("unchecked")
  @Override
  public UserEntity getUserById(Long id) {
    Session session = sessionFactory.getCurrentSession();
    final String sqlStr = "FROM UserEntity WHERE user_id=:userId"; 

    TypedQuery<UserEntity> query = session.createQuery(sqlStr);
    query.setMaxResults(1);
    query.setParameter("userId", id);

    List<UserEntity> users = query.getResultList();
    if(users.size()>0){
      return users.get(0);
    }

    return null;
  }

  @SuppressWarnings("unchecked")
  @Override
  public UserEntity getUserByEmail(String email) {
    Session session = sessionFactory.getCurrentSession();
    final String sqlStr = "FROM UserEntity WHERE email=:email"; 

    TypedQuery<UserEntity> query = session.createQuery(sqlStr);
    query.setMaxResults(1);
    query.setParameter("email", email);

    List<UserEntity> users = query.getResultList();
    if(users.size()>0){
      return users.get(0);
    }

    return null;
  }

}
