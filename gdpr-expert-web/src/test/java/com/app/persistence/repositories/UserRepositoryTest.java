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
public class UserRepositoryTest extends _RepositoriesConfiguration {

  @Autowired
  private UserRepository userRepository;

  public static final List<UserEntity> users = new ArrayList<>(2);

  @Test
  @Order(1)
  @Tag(value = "slow")

  public void addUserTest() {
    userRepository.deleteAll();

    UserEntity u1 = new UserEntity();
    u1.setActive(true);
    u1.setEmail(UUID.randomUUID().toString() + "a@mail.ru");
    u1.setPassword("p");
    userRepository.save(u1);
    Assertions.assertNotNull(u1.getId());
    users.add(u1);


    UserEntity u2 = new UserEntity();
    u2.setActive(true);
    u2.setEmail(UUID.randomUUID().toString() + "a@mail.ru");
    u2.setPassword("p");
    userRepository.save(u2);
    Assertions.assertNotNull(u2.getId());
    users.add(u2);

    // UserEntity u1 = userRepository.findByEmail(savedUserEmail)
    //     .orElseThrow(() -> new RuntimeException("user with email: a@mail.ru not found!"));
    // UserEntity u2 = userRepository.findById(savedUserId)
    //     .orElseThrow(() -> new RuntimeException(String.format("user with id: %d not found!", savedUserId)));
    // Iterable<UserEntity> users = userRepository.findAll();
    // Iterator<UserEntity> usersIterator = users.iterator();
    // UserEntity u3 = usersIterator.next();

    // Assertions.assertEquals(u.getId(), u1.getId());
    // Assertions.assertEquals(u1.getId(), u2.getId());
    // Assertions.assertEquals(u2.getId(), u3.getId());

    // userRepository.deleteAll();

  }

}