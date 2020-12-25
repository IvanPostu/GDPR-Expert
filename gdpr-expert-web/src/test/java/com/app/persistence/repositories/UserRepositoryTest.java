package com.app.persistence.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.app.domain.entities.UserEntity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;


@TestMethodOrder(OrderAnnotation.class)
@Tag(value = "slow")
public class UserRepositoryTest extends _RepositoriesConfiguration {

  @Autowired
  private UserRepository userRepository;

  private static final List<UserEntity> users = new ArrayList<>(2);

  @Test
  @Order(1)
  public void addUserTest() {

    UserEntity u1 = new UserEntity();
    u1.setActive(true);
    u1.setEmail(UUID.randomUUID().toString() + "a@mail.ru");
    u1.setPassword("p1");
    userRepository.save(u1);
    Assertions.assertNotNull(u1.getId());
    users.add(u1);

    UserEntity u2 = new UserEntity();
    u2.setActive(false);
    u2.setEmail(UUID.randomUUID().toString() + "a@mail.ru");
    u2.setPassword("p2");
    userRepository.save(u2);
    Assertions.assertNotNull(u2.getId());
    users.add(u2);
  }

  @Test
  @Order(2)
  public void findByEmailTest() {
    UserEntity userEntityFromDB = userRepository.findByEmail(users.get(0).getEmail()).get();
    Assertions.assertNotNull(userEntityFromDB);
    Assertions.assertTrue(userEntityFromDB.isActive());
  }

  @Test
  @Order(3)
  public void findByIdTest() {
    UserEntity userEntityFromDB = userRepository.findById(users.get(1).getId()).get();
    Assertions.assertNotNull(userEntityFromDB);
    Assertions.assertFalse(userEntityFromDB.isActive());
  }


  @Test
  @Order(4)
  public void deleteAllUsersTest() {
    userRepository.deleteAll();
  }

}