package com.app.persistence.repositories;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import com.app.domain.entities.OrganisationEntity;
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
public class OrganisationRepositoryTest extends _RepositoriesConfiguration {

  @Autowired
  private OrganisationRepository organisationRepository;
  @Autowired
  private UserRepository userRepository;

  @Test
  @Order(1)
  public void saveOrganisationTest() {
    organisationRepository.deleteAll();

    UserEntity fakeUser = new UserEntity();
    fakeUser.setActive(true);
    fakeUser.setEmail(UUID.randomUUID().toString() + "a@mail.ru");
    fakeUser.setPassword("p");
    userRepository.save(fakeUser);
    Assertions.assertNotNull(fakeUser.getId());

    OrganisationEntity oEntity = new OrganisationEntity();
    oEntity.setActive(true);
    oEntity.setAddress("aaa");
    oEntity.setAdministrator("juk");
    oEntity.setCreatedOnPlatformAt(LocalDateTime.now());
    oEntity.setDepatrments(new ArrayList<>());
    oEntity.setDescription("descr...");
    oEntity.setEmail("email@mail.ru");
    oEntity.setFoundedAt(new Date());
    oEntity.setLegalForm("SRL");
    oEntity.setName("Organisation Name");
    oEntity.setPhoneNumber("099999999");
    oEntity.setOwner(fakeUser);

    organisationRepository.save(oEntity);


    Assertions.assertTrue(oEntity.getId() > 0);
  }

}