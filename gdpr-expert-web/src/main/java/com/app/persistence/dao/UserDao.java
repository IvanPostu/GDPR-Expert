package com.app.persistence.dao;

import com.app.domain.entities.UserEntity;

public interface UserDao {

  void addUser(UserEntity user);

  void updateUser(UserEntity user);

  void removeUser(Long id);

  UserEntity getUserById(Long id);

  UserEntity getUserByEmail(final String email);

}
