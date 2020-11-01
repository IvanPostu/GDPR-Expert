package com.app.services;

import com.app.domain.entities.UserEntity;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailsServiceImpl implements UserDetailsService {

  private UserService userService;

  public UserDetailsServiceImpl(UserService userService){
    this.userService = userService;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

    UserEntity userFromDatabase = userService.getUserByEmail(username);
    if (userFromDatabase != null){
      User user = new User(
        userFromDatabase.getEmail(), 
        userFromDatabase.getPassword(),
        userFromDatabase.isActive(),
        true,
        true, 
        true,
        userFromDatabase.getRoles()
      );

      return user;
    }

    

    throw new UsernameNotFoundException("Unable to find user with username provided!!");
  }

}
