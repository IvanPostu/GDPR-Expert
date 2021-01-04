package com.app.services;

import javax.transaction.Transactional;

import com.app.domain.entities.AuthUserEntity;
import com.app.domain.entities.AuthUserRoleEntity;
import com.app.persistence.repositories.UserRepository;
import com.app.persistence.repositories.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public class UserServiceImpl implements UserService {

  private final UserRoleRepository roleRepository;
  private final UserRepository userRepository;

  @Autowired
  public UserServiceImpl(
    @Qualifier("userRoleRepositoryImpl") UserRoleRepository roleRepository, 
    UserRepository userRepository)
  {
    this.roleRepository = roleRepository;
    this.userRepository = userRepository;
  }

  @Transactional
  @Override
  public void addUser(AuthUserEntity user) {
    userRepository.save(user);
    
    for(AuthUserRoleEntity r: user.getRoles()){
      r.setId(user.getId());
      roleRepository.save(r);
    }

  }

  @Transactional
  @Override
  public AuthUserEntity getUserById(Long id) {
    AuthUserEntity user = userRepository.findById(id).orElseThrow(() -> new RuntimeException());
    return user;
  }

  @Transactional
  @Override
  public AuthUserEntity getUserByEmail(String email) {
    AuthUserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException());
    return user;
  }

 

}
