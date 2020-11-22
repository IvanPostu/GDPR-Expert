package com.app.services;

import com.app.domain.entities.UserEntity;

public interface UserService {
  
  void addUser(UserEntity user);

  UserEntity getUserById(Long id);

  UserEntity getUserByEmail(final String email);

}
