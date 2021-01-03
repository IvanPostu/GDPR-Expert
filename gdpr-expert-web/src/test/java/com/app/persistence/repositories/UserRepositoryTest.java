package com.app.persistence.repositories;

import javax.transaction.Transactional;

import com.app.domain.entities.AuthUserEntity;
import com.app.domain.entities.AuthUserPersonalInfoEntity;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;


@TestMethodOrder(OrderAnnotation.class)
public class UserRepositoryTest extends _RepositoriesConfiguration {

  @Autowired
  private UserRepository userRepository;

  private static final String fakeEmail1 = "a99091q@mail.ru";
  private static final String fakeEmail2 = "aAAA3eqfeq@mail.ru";

  private static Long savedId1;
  private static Long savedId2;

  /**
   * Depends on the number of users in the test migration 
   */
  private static final Long COUNT_FROM_TEST_MIGRATION = 8L;

  @Test
  @Order(1)
  public void saveTest(){
    AuthUserEntity u1 = new AuthUserEntity();
    u1.setActive(true);
    u1.setEmail(fakeEmail1);
    u1.setPassword("p1");
    AuthUserPersonalInfoEntity personalInfoEntity1 = new AuthUserPersonalInfoEntity();
    personalInfoEntity1.setPhoneNumber("0");
    u1.setPersonalInfoEntity(personalInfoEntity1);
    userRepository.save(u1);

    AuthUserEntity u2 = new AuthUserEntity();
    u2.setActive(false);
    u2.setEmail(fakeEmail2);
    u2.setPassword("p2");
    AuthUserPersonalInfoEntity personalInfoEntity2 = new AuthUserPersonalInfoEntity();
    personalInfoEntity2.setPhoneNumber("1");
    u2.setPersonalInfoEntity(personalInfoEntity2);
    userRepository.save(u2);

    savedId1 = u1.getId();
    savedId2 = u2.getId();

    Assertions.assertNotNull(savedId1);
    Assertions.assertNotNull(savedId2);

  }

  @Transactional
  @Test
  @Order(2)
  public void findByEmailTest(){
    AuthUserEntity u1 = userRepository.findByEmail(fakeEmail1)
      .orElseThrow(() -> new RuntimeException());
    AuthUserEntity u2 = userRepository.findByEmail(fakeEmail2)
      .orElseThrow(() -> new RuntimeException());

    AuthUserEntity vasile = userRepository.findByEmail("vasile@mail.ru")
      .orElseThrow(() -> new RuntimeException());
    
    String firstName = vasile.getPersonalInfoEntity().getFirstName();
    Assertions.assertEquals(firstName, "Vasile");

    Assertions.assertEquals(u1.getId(), savedId1);
    Assertions.assertEquals(u2.getId(), savedId2);

    Assertions.assertEquals(u1.getPersonalInfoEntity().getPhoneNumber(), "0");
    Assertions.assertEquals(u2.getPersonalInfoEntity().getPhoneNumber(), "1");

  }

  @Test
  @Order(3)
  public void findByIdTest(){
    AuthUserEntity u1 = userRepository.findById(savedId1)
      .orElseThrow(() -> new RuntimeException());
    AuthUserEntity u2 = userRepository.findById(savedId2)
      .orElseThrow(() -> new RuntimeException());

    Assertions.assertEquals(u1.getId(), savedId1);
    Assertions.assertEquals(u2.getId(), savedId2);
    Assertions.assertEquals(u1.getEmail(), fakeEmail1);
    Assertions.assertEquals(u2.getEmail(), fakeEmail2);
  }

  @Test
  @Order(4)
  public void countTest(){
    Long usersCount = userRepository.count();
    Assertions.assertEquals(usersCount, COUNT_FROM_TEST_MIGRATION + 2);
  }

  @Test
  @Order(5)
  public void removeByIdTest(){
    userRepository.removeById(savedId1);
    userRepository.removeById(savedId2);

    Long usersCount = userRepository.count();
    Assertions.assertEquals(usersCount, COUNT_FROM_TEST_MIGRATION);
  }
  
}