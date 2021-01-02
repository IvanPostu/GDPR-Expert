package com.app.persistence.repositories;

import com.app.domain.entities.UserEntity;
import com.app.domain.entities.UserRoleEntity;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

@TestMethodOrder(OrderAnnotation.class)
public class UserRoleRepositoryTest extends _RepositoriesConfiguration {
  
  @Autowired
  private UserRoleRepository userRoleRepository;

  @Autowired
  private UserRepository userRepository;

  private static Long roleId;

  @Order(1)
  @Test
  public void saveTest(){
    
    UserEntity user = userRepository.findByEmail("without_roles@gmail.ru").get();

    UserRoleEntity fakeRole = new UserRoleEntity();
    fakeRole.setName("USER");
    fakeRole.setId(user.getId());
    userRoleRepository.save(fakeRole);

    roleId = fakeRole.getId();

    /**
     * Check if trigger is running.
     */
    UserRoleEntity invalidRole = new UserRoleEntity();
    invalidRole.setName("AAAAA");
    invalidRole.setId(user.getId());

    Assertions.assertThrows(DataIntegrityViolationException.class, () -> {
      userRoleRepository.save(invalidRole);
    });
  }
  
  @Order(2)
  @Test
  public void deleteByIdTest(){
    userRoleRepository.removeById(roleId);
  }

}
