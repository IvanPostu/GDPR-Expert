package com.app.services;

import java.util.Arrays;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

    if (username.equals("juju")) {
      User user = new User("juju", "qwerty", true, true, true, true, Arrays.asList(new GrantedAuthority() {
        @Override
        public String getAuthority() {
          return "ROLE_ADMIN";
        }
      }));

      return user;
    }

    throw new UsernameNotFoundException("Unable to find user with username provided!!");
  }

}
