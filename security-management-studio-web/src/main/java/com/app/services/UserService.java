package com.app.services;

import com.app.domain.entities.User;

public interface UserService {
  
  void addUser(User user);

  void updateUser(User user);

  void removeUser(int id);

  User getUserById(int id);

  User getUserByUsername(final String username);


}
