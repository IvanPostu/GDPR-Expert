package com.app.persistence.repositories;

import com.app.domain.entities.AuthUserEntity;
import com.app.domain.entities.AuthUserRoleEntity;
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
    
    AuthUserEntity user = userRepository.findByEmail("without_roles@gmail.ru").get();

    AuthUserRoleEntity fakeRole = new AuthUserRoleEntity();
    fakeRole.setName("USER");
    fakeRole.setId(user.getId());
    userRoleRepository.save(fakeRole);

    roleId = fakeRole.getId();

    /**
     * Check if trigger is running.
     */
    AuthUserRoleEntity invalidRole = new AuthUserRoleEntity();
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
