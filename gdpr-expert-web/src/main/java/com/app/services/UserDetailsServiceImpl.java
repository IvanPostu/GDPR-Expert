package com.app.services;

import com.app.domain.entities.UserEntity;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailsServiceImpl implements UserDetailsService {

  private UserService userService;

  public UserDetailsServiceImpl(UserService userService){
    this.userService = userService;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    UserEntity u = userService.getUserByEmail(email);
    return u;
  }

}
