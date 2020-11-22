package com.app.services;

import javax.transaction.Transactional;

import com.app.domain.entities.UserEntity;
import com.app.domain.entities.UserRoleEntity;
import com.app.persistence.repositories.UserRepository;
import com.app.persistence.repositories.UserRoleRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImpl implements UserService {

  private final UserRoleRepository roleRepository;
  private final UserRepository userRepository;

  @Autowired
  public UserServiceImpl(UserRoleRepository roleRepository, UserRepository userRepository){
    this.roleRepository = roleRepository;
    this.userRepository = userRepository;
  }

  @Transactional
  @Override
  public void addUser(UserEntity user) {
    userRepository.save(user);
    
    for(UserRoleEntity r: user.getRoles()){
      r.setId(user.getId());
      roleRepository.save(r);
    }

  }

  @Transactional
  @Override
  public UserEntity getUserById(Long id) {
    UserEntity user = userRepository.findById(id).orElseThrow(() -> new RuntimeException());
    return user;
  }

  @Transactional
  @Override
  public UserEntity getUserByEmail(String email) {
    UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException());
    return user;
  }

 

}
