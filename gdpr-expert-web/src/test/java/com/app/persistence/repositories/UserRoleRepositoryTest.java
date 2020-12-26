package com.app.persistence.repositories;

import java.util.UUID;

import com.app.domain.entities.UserEntity;
import com.app.domain.entities.UserRoleEntity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

@TestMethodOrder(OrderAnnotation.class)
@Tag(value = "slow")
public class UserRoleRepositoryTest extends _RepositoriesConfiguration {
  
  @Autowired
  private UserRoleRepository userRoleRepository;

  @Autowired
  private UserRepository userRepository;

  @Order(1)
  @Test
  public void saveTest(){
    UserEntity fakeUser1 = new UserEntity();
    fakeUser1.setActive(true);
    fakeUser1.setEmail(UUID.randomUUID().toString() + "a@mail.ru");
    fakeUser1.setPassword("p");
    userRepository.save(fakeUser1);
    Assertions.assertNotNull(fakeUser1.getId());

    UserRoleEntity fakeRole = new UserRoleEntity();
    fakeRole.setName("USER");
    fakeRole.setId(fakeUser1.getId());
    userRoleRepository.save(fakeRole);
    Assertions.assertNotNull(fakeRole.getId());

    UserRoleEntity invalidRole = new UserRoleEntity();
    invalidRole.setName("AAAAA");
    invalidRole.setId(fakeUser1.getId());

    Assertions.assertThrows(DataIntegrityViolationException.class, () -> {
      userRoleRepository.save(invalidRole);
    });
  }
  
  @Order(100)
  @Test
  public void deleteAllTest(){
    userRoleRepository.deleteAll();
    userRepository.deleteAll();
  }

}
