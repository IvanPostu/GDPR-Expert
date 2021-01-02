package com.app.persistence.repositories;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.RequestForPersonalInfoEntity;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@TestMethodOrder(OrderAnnotation.class)
public class RequestForPersonalInfoRepositoryTest extends _RepositoriesConfiguration {
  
  @Autowired
  private RequestForPersonalInfoRepository requestForPersonalInfoRepository;
  @Autowired
  private OrganisationRepository organisationRepository;

  private static final Long INITIAL_COUNT = 4L;

  private static OrganisationEntity organisation;
  private static Long organisationOwnerId;

  private static Long savedRequestForPersonalInfoEntityId1;
  private static Long savedRequestForPersonalInfoEntityId2;

  @Test
  @Order(1)
  @Transactional
  public void setupTest(){
    Pageable pageable = PageRequest.of(0, 1, Sort.by("Id").ascending());
    List<OrganisationEntity> orgs = organisationRepository.findAll(pageable).getContent();
    organisation = orgs.get(0);
    organisationOwnerId = organisation.getOwner().getId();

    Assertions.assertNotNull(organisation);
  }

  @Test
  @Order(2)
  void saveTest(){
    RequestForPersonalInfoEntity r1 = new RequestForPersonalInfoEntity();
    r1.setComment("comment adf ad...");
    r1.setOrganisation(organisation);
    r1.setPersonEmail("qqq@mail.ru");
    r1.setPersonFirstname("fNameexample");
    r1.setPersonLastname("lNameexample");
    r1.setPersonPhoneNumber("067777777");
    r1.setProcessed(true);
    r1.setRequestedAt(new Date());
    r1.setRequestedRight("data access");

    RequestForPersonalInfoEntity r2 = new RequestForPersonalInfoEntity();
    r2.setComment("comment2 adf ad...");
    r2.setOrganisation(organisation);
    r2.setPersonEmail("qqq2@mail.ru");
    r2.setPersonFirstname("f2Nameexample");
    r2.setPersonLastname("l2Nameexample");
    r2.setPersonPhoneNumber("022222222");
    r2.setProcessed(false);
    r2.setRequestedAt(new Date());
    r2.setRequestedRight("data access");

    requestForPersonalInfoRepository.save(r1);
    requestForPersonalInfoRepository.save(r2);

    savedRequestForPersonalInfoEntityId1 = r1.getId();
    savedRequestForPersonalInfoEntityId2 = r2.getId();

    Assertions.assertNotNull(savedRequestForPersonalInfoEntityId1);
    Assertions.assertNotNull(savedRequestForPersonalInfoEntityId2);
  }

  @Test
  @Order(3)
  public void getRequestForPersonalInfoByIdTest(){
    RequestForPersonalInfoEntity r1 = requestForPersonalInfoRepository
      .getRequestForPersonalInfoById(savedRequestForPersonalInfoEntityId1);
    RequestForPersonalInfoEntity r2 = requestForPersonalInfoRepository
      .getRequestForPersonalInfoById(savedRequestForPersonalInfoEntityId2);
    
    Assertions.assertNotNull(r1);
    Assertions.assertNotNull(r2);  
  }

  @Test
  @Order(4)
  public void getAllRequestsForUserOrganisationsTest(){
    Pageable pageable = PageRequest.of(0, 3, Sort.by("Id").ascending());;
    List<RequestForPersonalInfoEntity> requests = requestForPersonalInfoRepository    
      .getAllRequestsForUserOrganisations(organisationOwnerId, pageable)
      .getContent();
    
    Assertions.assertTrue(requests.size() >= 2);
  }

  @Test
  @Order(5)
  void countTest(){
    Long count = requestForPersonalInfoRepository.count();
    Assertions.assertEquals(INITIAL_COUNT + 2, count);
  }

  @Test
  @Order(6)
  void removeByIdTest(){

    requestForPersonalInfoRepository.removeById(savedRequestForPersonalInfoEntityId1);
    requestForPersonalInfoRepository.removeById(savedRequestForPersonalInfoEntityId2);

    Long count2 = requestForPersonalInfoRepository.count();

    Assertions.assertEquals(count2, INITIAL_COUNT);
  }

}
