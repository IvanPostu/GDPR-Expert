package com.app.persistence.repositories;

import java.time.LocalDateTime;
import java.util.List;

import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.OrganisationEntity;
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
public class DepartmentRepositoryTest extends _RepositoriesConfiguration {

  @Autowired
  private DepartmentRepository departmentRepository;
  @Autowired
  private OrganisationRepository organisationRepository;

  private static final Long INITIAL_COUNT = 7L;

  private static  OrganisationEntity organisation;

  private static Long savedDepartmentId1;
  private static Long savedDepartmentId2;

  @Test
  @Order(1)
  public void getOrganisation() {
    Pageable pageable1 = PageRequest.of(0, 2, Sort.by("Id").descending());
    List<OrganisationEntity> l1 = organisationRepository.findAll(pageable1).getContent();
    Pageable pageable2 = PageRequest.of(0, 2, Sort.by("Id").ascending());
    List<OrganisationEntity> l2 = organisationRepository.findAll(pageable2).getContent();

    organisation = l1.get(0);
    Assertions.assertNotNull(organisation);

    /**
     * Check if pageable work correctly
     */
    Assertions.assertTrue(l1.get(0).getId() > l1.get(1).getId());
    Assertions.assertTrue(l2.get(0).getId() < l2.get(1).getId());

    Assertions.assertTrue(l1.size() == 2);
    Assertions.assertTrue(l2.size() == 2);
  }

  @Test
  @Order(2)
  void saveTest(){
    DepartmentEntity departmentEntity1 = new DepartmentEntity();
    departmentEntity1.setActive(true);
    departmentEntity1.setCreatedAt(LocalDateTime.now());
    departmentEntity1.setEmail("aaa@mail.ru");
    departmentEntity1.setName("TestName");
    departmentEntity1.setOrganisation(organisation);
    departmentEntity1.setPhoneNumber("0888888888");
    departmentEntity1.setResponsible("Vasile Siliv");
    departmentRepository.save(departmentEntity1);

    DepartmentEntity departmentEntity2 = new DepartmentEntity();
    departmentEntity2.setActive(true);
    departmentEntity2.setCreatedAt(LocalDateTime.now());
    departmentEntity2.setEmail("aaa@mail.ru");
    departmentEntity2.setName("TestName");
    departmentEntity2.setOrganisation(organisation);
    departmentEntity2.setPhoneNumber("0888888888");
    departmentEntity2.setResponsible("Vasile Rik");
    departmentRepository.save(departmentEntity2);

    savedDepartmentId1 = departmentEntity1.getId();
    savedDepartmentId2 = departmentEntity2.getId();

    Assertions.assertNotNull(savedDepartmentId1);
    Assertions.assertNotNull(savedDepartmentId2);
  }

  @Test
  @Order(3)
  void findByIdTest(){
    DepartmentEntity departmentEntity = departmentRepository.findById(savedDepartmentId1).get();
    Assertions.assertNotNull(departmentEntity);
  }
  
  @Test
  @Order(4)
  void deleteByIdTest(){
    Long count = departmentRepository.count();
    Assertions.assertEquals(count, INITIAL_COUNT + 2);
    departmentRepository.deleteById(savedDepartmentId1);
    departmentRepository.deleteById(savedDepartmentId2);
  }

  @Test
  @Order(5)
  void countTest(){
    Long count = departmentRepository.count();
    Assertions.assertEquals(count, INITIAL_COUNT);
  }


}
