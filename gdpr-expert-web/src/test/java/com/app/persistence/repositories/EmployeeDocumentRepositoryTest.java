package com.app.persistence.repositories;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.EmployeeDocumentEntity;
import com.app.domain.entities.EmployeeEntity;
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
public class EmployeeDocumentRepositoryTest extends _RepositoriesConfiguration{  
  

  @Autowired
  private OrganisationRepository organisationRepository;

  @Autowired
  private EmployeeDocumentRepository employeeDocumentRepository;

  private static final Long INITIAL_EMPLOYEE_DOCUMENTS_COUNT = 5L;

  private static Long savedEmployeeDocumentId1;
  private static Long savedEmployeeDocumentId2;
  private static Long savedEmployeeDocumentId3;

  private static EmployeeEntity employee;

  @Order(1)
  @Test
  @Transactional
  public void setupTest(){
    Pageable pageable = PageRequest.of(0, 1, Sort.by("Id").ascending());
    OrganisationEntity organisation = organisationRepository.findAll(pageable).getContent().get(0);
    DepartmentEntity department = organisation.getDepatrments().get(0);
    employee = department.getEmployees().get(0);

    Assertions.assertNotNull(employee);
  }

  @Order(2)
  @Test
  void saveAllTest(){
    EmployeeDocumentEntity d1 = new EmployeeDocumentEntity();
    d1.setDocumentDataBlob("adfdaf".getBytes());
    d1.setEmployee(employee);
    d1.setFileName("test31314134.doc");
    d1.setUploadedToThePlatformAt(new Date());

    EmployeeDocumentEntity d2 = new EmployeeDocumentEntity();
    d2.setDocumentDataBlob("qqqqq".getBytes());
    d2.setEmployee(employee);
    d2.setFileName("zzzzzz.doc");
    d2.setUploadedToThePlatformAt(new Date());

    EmployeeDocumentEntity d3 = new EmployeeDocumentEntity();
    d3.setDocumentDataBlob("ffff".getBytes());
    d3.setEmployee(employee);
    d3.setFileName("fffff.doc");
    d3.setUploadedToThePlatformAt(new Date());

    employeeDocumentRepository.saveAll(Arrays.asList(d1, d2, d3));

    savedEmployeeDocumentId1 = d1.getEmployeeDocumentId();
    savedEmployeeDocumentId2 = d2.getEmployeeDocumentId();
    savedEmployeeDocumentId3 = d3.getEmployeeDocumentId();

    Assertions.assertNotNull(savedEmployeeDocumentId1);
    Assertions.assertNotNull(savedEmployeeDocumentId2);
    Assertions.assertNotNull(savedEmployeeDocumentId3);
  }

  @Order(3)
  @Test
  void getEmployeeDocumentsWithoutBlobTest(){
    Collection<EmployeeDocumentEntity> documents = employeeDocumentRepository
      .getEmployeeDocumentsWithoutBlob(employee.getId());

    List<EmployeeDocumentEntity> savedDocuments = documents
    .stream()
    .filter(a -> a.getEmployeeDocumentId().equals(savedEmployeeDocumentId1)
      || a.getEmployeeDocumentId().equals(savedEmployeeDocumentId2) 
      || a.getEmployeeDocumentId().equals(savedEmployeeDocumentId3))
    .collect(Collectors.toList());

    Assertions.assertTrue(savedDocuments.size() == 3);

    Assertions.assertNull(savedDocuments.get(0).getDocumentDataBlob());
    Assertions.assertNull(savedDocuments.get(1).getDocumentDataBlob());
    Assertions.assertNull(savedDocuments.get(2).getDocumentDataBlob());
  } 

  @Order(4)
  @Test
  void getEmployeeDocumentsWithBlobTest(){
    Collection<EmployeeDocumentEntity> documents = employeeDocumentRepository
      .getEmployeeDocumentsWithBlob(employee.getId());

    List<EmployeeDocumentEntity> savedDocuments = documents
    .stream()
    .filter(a -> a.getEmployeeDocumentId().equals(savedEmployeeDocumentId1)
      || a.getEmployeeDocumentId().equals(savedEmployeeDocumentId2) 
      || a.getEmployeeDocumentId().equals(savedEmployeeDocumentId3))
    .collect(Collectors.toList());

    Assertions.assertTrue(savedDocuments.size() == 3);

    Assertions.assertNotNull(savedDocuments.get(0).getDocumentDataBlob());
    Assertions.assertNotNull(savedDocuments.get(1).getDocumentDataBlob());
    Assertions.assertNotNull(savedDocuments.get(2).getDocumentDataBlob());
  } 

  @Order(5)
  @Test
  void findByIdTest(){
    EmployeeDocumentEntity e1 = employeeDocumentRepository.findById(savedEmployeeDocumentId1).get();
    EmployeeDocumentEntity e2 = employeeDocumentRepository.findById(savedEmployeeDocumentId2).get();
    EmployeeDocumentEntity e3 = employeeDocumentRepository.findById(savedEmployeeDocumentId3).get();
    Assertions.assertEquals(e1.getEmployeeDocumentId(), savedEmployeeDocumentId1);
    Assertions.assertEquals(e2.getEmployeeDocumentId(), savedEmployeeDocumentId2);
    Assertions.assertEquals(e3.getEmployeeDocumentId(), savedEmployeeDocumentId3);
  }


  @Order(6)
  @Test
  void countTest(){
    Long countFromDb = employeeDocumentRepository.count();
    Assertions.assertEquals(INITIAL_EMPLOYEE_DOCUMENTS_COUNT + 3, countFromDb);
  }

  @Order(7)
  @Test
  void deleteByIdTest(){
    employeeDocumentRepository.deleteById(savedEmployeeDocumentId1);
    employeeDocumentRepository.deleteById(savedEmployeeDocumentId2);
    employeeDocumentRepository.deleteById(savedEmployeeDocumentId3);

    Long countFromDb = employeeDocumentRepository.count();
    Assertions.assertEquals(INITIAL_EMPLOYEE_DOCUMENTS_COUNT, countFromDb);
  }


}
