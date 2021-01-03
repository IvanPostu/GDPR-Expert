package com.app.services;

import com.app.domain.entities.AuthUserEntity;

public interface UserService {
  
  void addUser(AuthUserEntity user);

  AuthUserEntity getUserById(Long id);

  AuthUserEntity getUserByEmail(final String email);

}
