package com.app.services;

import java.util.Optional;

import com.app.domain.entities.AuthUserEntity;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


public class UserDetailsServiceImpl implements UserDetailsService {
  private static final Logger logger = LogManager.getLogger(UserDetailsServiceImpl.class);

  private UserService userService;

  public UserDetailsServiceImpl(UserService userService){
    this.userService = userService;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Optional<AuthUserEntity> optionalAuthUserEntity = userService.getUserByEmail(email);

    if(!optionalAuthUserEntity.isPresent()){
      logger.info("The user with the email could not log in, email not found!!!");
      String message = String.format("user with email %s not found !!!", email);
      throw new UsernameNotFoundException(message); 
    }
    
    return optionalAuthUserEntity.get();
  }

}
