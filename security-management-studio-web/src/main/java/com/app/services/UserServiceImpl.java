package com.app.services;

import javax.transaction.Transactional;

import com.app.domain.entities.UserEntity;
import com.app.domain.entities.UserRoleEntity;
import com.app.persistence.dao.UserDao;
import com.app.persistence.dao.UserRoleDao;

public class UserServiceImpl implements UserService {

  private UserDao userDao;
  private UserRoleDao userRoleDao;

  public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
  }

  public void setUserRoleDao(UserRoleDao userRoleDao) {
    this.userRoleDao = userRoleDao;
  }

  @Override
  @Transactional
  public void addUser(UserEntity user) {
    userDao.addUser(user);
    
    for(UserRoleEntity r : user.getRoles()){
      r.setId(user.getId());
      userRoleDao.addRole(r);
    }

  }

  @Override
  @Transactional
  public void updateUser(UserEntity user) {
    userDao.updateUser(user);
  }

  @Override
  @Transactional
  public void removeUser(Long id) {
    userDao.removeUser(id);
  }

  @Override
  @Transactional
  public UserEntity getUserById(Long id) {
    return userDao.getUserById(id);
  }

  @Override
  @Transactional
  public UserEntity getUserByEmail(final String email) {
    return userDao.getUserByEmail(email);
  }

}
