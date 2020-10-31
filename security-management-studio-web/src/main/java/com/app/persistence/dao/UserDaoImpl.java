
package com.app.persistence.dao;

import java.util.List;

import javax.persistence.TypedQuery;

import com.app.domain.entities.User;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
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
  public void addUser(User user) {
    Session session = sessionFactory.getCurrentSession();
    session.persist(user);
    logger.info("User successfully saved. User info " + user.toString());
  }

  @Override
  public void updateUser(User user) {
    Session session = sessionFactory.getCurrentSession();
    session.update(user);
    logger.info("User successfully updated. User info " + user.toString());
  }

  @Override
  public void removeUser(int id) {
    Session session = sessionFactory.getCurrentSession();
    User user = session.load(User.class, id);
    
    if(user!=null){
      session.delete(user);
    }

    logger.info("User successfully deleted. User info " + user.toString());
  }

  @Override
  public User getUserById(int id) {
    Session session = sessionFactory.getCurrentSession();
    User user = session.load(User.class, id);

    return user;
  }

  @Override
  public User getUserByUsername(String username) {
    final String sqlStr = "FROM app_user WHERE username=:uname"; 
    Session session = sessionFactory.getCurrentSession();
    Transaction tx=session.beginTransaction();  
    TypedQuery<User> query = session.createQuery(sqlStr);
    query.setParameter("uname", username);
    query.setMaxResults(1);

    List<User> user = query.getResultList();

    tx.commit();
    return null;
  }

}
