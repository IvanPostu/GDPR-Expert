package com.app.services;

import java.util.Optional;

import com.app.domain.entities.AuthUserEntity;

public interface UserService {
  
  void addUser(AuthUserEntity user);

  AuthUserEntity getUserById(Long id);

  Optional<AuthUserEntity> getUserByEmail(final String email);

}
