package com.app.persistence.repositories;

import org.junit.jupiter.api.Assertions;

import java.util.Iterator;
import java.util.UUID;

import com.app.domain.entities.UserEntity;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ContextConfiguration({ "file:src/main/webapp/WEB-INF/context.xml", "file:src/test/webapp/WEB-INF/datasource.xml", })
@TestMethodOrder(OrderAnnotation.class)
public class UserRepositoryTest {

  @Autowired
  private UserRepository userRepository;

  @Test
  @Order(1)
  @Tag(value = "slow")

  public void CRUDUserTest() {
    userRepository.deleteAll();
    // if(1+1 == 2)
    // throw new RuntimeException();
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