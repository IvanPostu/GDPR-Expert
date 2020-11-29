package com.app.persistence.repositories;

import java.util.Iterator;
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

  @Test
  @Order(1)
  @Tag(value = "slow")

  public void CRUDUserTest() {
    userRepository.deleteAll();

    Long savedUserId;
    String savedUserEmail;
    savedUserEmail = UUID.randomUUID().toString() + "a@mail.ru";
    UserEntity u = new UserEntity();
    u.setActive(true);
    u.setEmail(savedUserEmail);
    u.setPassword("p");
    userRepository.save(u);
    savedUserId = u.getId();
    Assertions.assertNotNull(savedUserId);

    UserEntity u1 = userRepository.findByEmail(savedUserEmail)
        .orElseThrow(() -> new RuntimeException("user with email: a@mail.ru not found!"));
    UserEntity u2 = userRepository.findById(savedUserId)
        .orElseThrow(() -> new RuntimeException(String.format("user with id: %d not found!", savedUserId)));
    Iterable<UserEntity> users = userRepository.findAll();
    Iterator<UserEntity> usersIterator = users.iterator();
    UserEntity u3 = usersIterator.next();

    Assertions.assertEquals(u.getId(), u1.getId());
    Assertions.assertEquals(u1.getId(), u2.getId());
    Assertions.assertEquals(u2.getId(), u3.getId());

    userRepository.deleteAll();

  }

}