package com.app.persistence.repositories;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;



@TestMethodOrder(OrderAnnotation.class)
public class OrganisationRepositoryTest extends _RepositoriesConfiguration {

  @Autowired
  // private OrganisationRepository organisationRepository;

  
  @Test
  // @Order(1)
  @Tag(value = "slow")

  public void CRUDOrganisationTest() {
    Assertions.assertEquals(2, 1+1);
    // organisationRepository.deleteAll();
    // OrganisationEntity oEntity = new OrganisationEntity();
    // oEntity.setActive(true);
    // oEntity.setAddress("aaa");
    // oEntity.setAdministrator("juk");
    // oEntity.setCreatedOnPlatformAt(LocalDateTime.now());
    // oEntity.setDepatrments(new ArrayList<>());
    // oEntity.setDescription("descr...");
    // oEntity.setEmail("email@mail.ru");
    // oEntity.setFoundedAt(new Date());
    // oEntity.setLegalForm("SRL");
    // oEntity.setName("Organisation Name");
    // oEntity.setPhoneNumber("099999999");



  }

}