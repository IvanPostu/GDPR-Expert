package com.app.persistence.repositories;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.UserEntity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@TestMethodOrder(OrderAnnotation.class)
@Tag(value = "slow")
public class OrganisationRepositoryTest extends _RepositoriesConfiguration {

  @Autowired
  private OrganisationRepository organisationRepository;
  @Autowired
  private UserRepository userRepository;

  private static final List<OrganisationEntity> organisations = new ArrayList<>(10);

  @Test
  @Order(1)
  public void saveOrganisationTest() {

    UserEntity fakeUser1 = new UserEntity();
    fakeUser1.setActive(true);
    fakeUser1.setEmail(UUID.randomUUID().toString() + "a@mail.ru");
    fakeUser1.setPassword("p");
    userRepository.save(fakeUser1);
    Assertions.assertNotNull(fakeUser1.getId());
    OrganisationEntity oEntity1 = new OrganisationEntity();
    oEntity1.setActive(true);
    oEntity1.setAddress("aaa");
    oEntity1.setAdministrator("juk");
    oEntity1.setCreatedOnPlatformAt(LocalDateTime.now());
    oEntity1.setDepatrments(new ArrayList<>());
    oEntity1.setDescription("descr...");
    oEntity1.setEmail("email@mail.ru");
    oEntity1.setFoundedAt(new Date());
    oEntity1.setLegalForm("SRL");
    oEntity1.setName("Organisation Name");
    oEntity1.setPhoneNumber("099999999");
    oEntity1.setOwner(fakeUser1);
    organisationRepository.save(oEntity1);
    Assertions.assertTrue(oEntity1.getId() > 0);

    UserEntity fakeUser2 = new UserEntity();
    fakeUser2.setActive(true);
    fakeUser2.setEmail(UUID.randomUUID().toString() + "a@mail.ru");
    fakeUser2.setPassword("p");
    userRepository.save(fakeUser2);
    Assertions.assertNotNull(fakeUser2.getId());
    OrganisationEntity oEntity2 = new OrganisationEntity();
    oEntity2.setActive(true);
    oEntity2.setAddress("aaa");
    oEntity2.setAdministrator("juk");
    oEntity2.setCreatedOnPlatformAt(LocalDateTime.now());
    oEntity2.setDepatrments(new ArrayList<>());
    oEntity2.setDescription("descr...");
    oEntity2.setEmail("email@mail.ru");
    oEntity2.setFoundedAt(new Date());
    oEntity2.setLegalForm("SRL");
    oEntity2.setName("Organisation Name");
    oEntity2.setPhoneNumber("099999999");
    oEntity2.setOwner(fakeUser2);
    organisationRepository.save(oEntity2);
    Assertions.assertTrue(oEntity2.getId() > 0);
    OrganisationEntity oEntity3 = new OrganisationEntity();
    oEntity3.setActive(true);
    oEntity3.setAddress("aaa");
    oEntity3.setAdministrator("juk");
    oEntity3.setCreatedOnPlatformAt(LocalDateTime.now());
    oEntity3.setDepatrments(new ArrayList<>());
    oEntity3.setDescription("descr...");
    oEntity3.setEmail("email@mail.ru");
    oEntity3.setFoundedAt(new Date());
    oEntity3.setLegalForm("SRL");
    oEntity3.setName("Organisation Name");
    oEntity3.setPhoneNumber("099999999");
    oEntity3.setOwner(fakeUser2);
    organisationRepository.save(oEntity3);
    Assertions.assertTrue(oEntity3.getId() > 0);

    organisations.add(oEntity1);
    organisations.add(oEntity2);
    organisations.add(oEntity3);
  }

  @Test
  @Order(2)
  @Transactional
  public void findAllByOwnerIdTest() {

    // findAllByOwnerId
    UserEntity userWithTwoOrganisations = organisations.get(1).getOwner();
    List<OrganisationEntity> orgs = organisationRepository.findAllByOwnerId(userWithTwoOrganisations.getId());
    Assertions.assertEquals(orgs.size(), 2);

  }

  @Test
  @Order(3)
  @Transactional
  public void findOrganisationByIdAndOwnerIdTest() {
    OrganisationEntity o1 = organisationRepository
        .findOrganisationByIdAndOwnerId(organisations.get(0).getId(), organisations.get(0).getOwner().getId())
        .orElse(null);
    Assertions.assertNotNull(o1);

    OrganisationEntity o2 = organisationRepository
        .findOrganisationByIdAndOwnerId(organisations.get(0).getId(), organisations.get(1).getOwner().getId())
        .orElse(null);
    Assertions.assertNull(o2);
  }

  @Test
  @Order(4)
  @Transactional
  public void findByIdTest() {
    // findById
    OrganisationEntity o2 = organisationRepository.findById(organisations.get(0).getId()).get();
    Assertions.assertNotNull(o2);
  }

  @Test
  @Order(5)
  @Transactional
  public void findAllTest() {
    // //findAll
    Pageable pageable = PageRequest.of(0, 100, Sort.by("Id").descending());
    List<OrganisationEntity> allOrgs = organisationRepository.findAll(pageable).toList();
    Assertions.assertEquals(allOrgs.size(), 3);
  }

  @Test
  @Order(100)
  public void deleteAllOrganisationsTest() {
    organisationRepository.deleteAll();
    userRepository.deleteAll();
  }

}