package com.app.persistence.repositories;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

  private static final String userEmail1 = "vasile@mail.ru";
  private static final String userEmail2 = "mihail@mail.ru";

  private static UserEntity user1;
  private static UserEntity user2;

  private static OrganisationEntity organisation1;
  private static OrganisationEntity organisation2;
  private static OrganisationEntity organisation3;

  @Test
  @Order(1)
  public void saveOrganisationTest() {

    user1 = userRepository.findByEmail(userEmail1).get();
    user2 = userRepository.findByEmail(userEmail2).get();

    
    organisation1 = new OrganisationEntity();
    organisation1.setActive(true);
    organisation1.setAddress("aaa");
    organisation1.setAdministrator("juk");
    organisation1.setCreatedOnPlatformAt(LocalDateTime.now());
    organisation1.setDepatrments(new ArrayList<>());
    organisation1.setDescription("descr...");
    organisation1.setEmail("email@mail.ru");
    organisation1.setFoundedAt(new Date());
    organisation1.setLegalForm("SRL");
    organisation1.setName("Organisation Name");
    organisation1.setPhoneNumber("099999999");
    organisation1.setOwner(user1);
    organisationRepository.save(organisation1);
    Assertions.assertTrue(organisation1.getId() > 0);
  
    organisation2 = new OrganisationEntity();
    organisation2.setActive(true);
    organisation2.setAddress("aaa");
    organisation2.setAdministrator("juk");
    organisation2.setCreatedOnPlatformAt(LocalDateTime.now());
    organisation2.setDepatrments(new ArrayList<>());
    organisation2.setDescription("descr...");
    organisation2.setEmail("email@mail.ru");
    organisation2.setFoundedAt(new Date());
    organisation2.setLegalForm("SRL");
    organisation2.setName("Organisation Name");
    organisation2.setPhoneNumber("099999999");
    organisation2.setOwner(user2);
    organisationRepository.save(organisation2);
    Assertions.assertTrue(organisation2.getId() > 0);
    
    organisation3 = new OrganisationEntity();
    organisation3.setActive(true);
    organisation3.setAddress("aaa");
    organisation3.setAdministrator("juk");
    organisation3.setCreatedOnPlatformAt(LocalDateTime.now());
    organisation3.setDepatrments(new ArrayList<>());
    organisation3.setDescription("descr...");
    organisation3.setEmail("email@mail.ru");
    organisation3.setFoundedAt(new Date());
    organisation3.setLegalForm("SRL");
    organisation3.setName("Organisation Name");
    organisation3.setPhoneNumber("099999999");
    organisation3.setOwner(user2);
    organisationRepository.save(organisation3);
    Assertions.assertTrue(organisation3.getId() > 0);

  }

  @Test
  @Order(2)
  @Transactional
  public void findAllByOwnerIdTest() {

    UserEntity userWithTwoOrMoreOrganisations = user2;
    List<OrganisationEntity> orgs = organisationRepository
      .findAllByOwnerId(userWithTwoOrMoreOrganisations.getId());
    Assertions.assertTrue(orgs.size() >= 2);

  }

  @Test
  @Order(3)
  @Transactional
  public void findOrganisationByIdAndOwnerIdTest() {
    OrganisationEntity o1 = organisationRepository
      .findOrganisationByIdAndOwnerId(organisation2.getId(),user2.getId())
      .orElse(null);
    Assertions.assertNotNull(o1);

    OrganisationEntity o2 = organisationRepository
      .findOrganisationByIdAndOwnerId(organisation2.getId(),user1.getId())
      .orElse(null);
    Assertions.assertNull(o2);
  }

  @Test
  @Order(4)
  @Transactional
  public void findByIdTest() {
    OrganisationEntity o2 = organisationRepository.findById(organisation1.getId()).get();
    Assertions.assertNotNull(o2);
  }

  @Test
  @Order(5)
  @Transactional
  public void findAllTest() {
    Pageable pageable = PageRequest.of(0, 100, Sort.by("Id").descending());
    List<OrganisationEntity> allOrgs = organisationRepository.findAll(pageable).toList();
    Assertions.assertTrue(allOrgs.size() >= 3);
  }

  @Test
  @Order(6)
  public void deleteByIdTest() {
    organisationRepository.deleteById(organisation1.getId());
    organisationRepository.deleteById(organisation2.getId());
    organisationRepository.deleteById(organisation3.getId());
  }

}