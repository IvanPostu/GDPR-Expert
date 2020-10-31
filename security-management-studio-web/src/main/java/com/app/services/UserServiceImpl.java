package com.app.services;

import com.app.domain.entities.User;
import com.app.persistence.dao.UserDao;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private UserDao userDao;

  public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
  }

  @Override
  public void addUser(User user) {
    userDao.addUser(user);

  }

  @Override
  public void updateUser(User user) {
    userDao.updateUser(user);
  }

  @Override
  public void removeUser(int id) {
    userDao.removeUser(id);
  }

  @Override
  public User getUserById(int id) {
    return userDao.getUserById(id);
  }

  @Override
  public User getUserByUsername(String username) {
    return userDao.getUserByUsername(username);
  }
  
}
