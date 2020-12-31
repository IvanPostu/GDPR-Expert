package com.app.persistence.repositories;

import javax.transaction.Transactional;

import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.EmployeeEntity;
import com.app.domain.entities.OrganisationEntity;
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
public class EmployeeRepositoryTest extends _RepositoriesConfiguration {
  
  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  private OrganisationRepository organisationRepository;

  private static final Long INITIAL_EMPLOYEE_COUNT = 6L;

  private DepartmentEntity department;
  private OrganisationEntity organisation;

  private static Long savedEmployeeId1;
  private static Long savedEmployeeId2;

  @Order(1)
  @Test
  @Transactional
  public void setupTest(){
    Pageable pageable = PageRequest.of(0, 1, Sort.by("Id").ascending());
    organisation = organisationRepository.findAll(pageable).getContent().get(0);
    department = organisation.getDepatrments().get(0);
  }

  @Order(2)
  @Test
  public void saveTest(){
    EmployeeEntity e1 = new EmployeeEntity();
    e1.setDepartment(department);
    e1.setFirstName("Vasile");
    e1.setLastName("Vasile");
    e1.setAddress("53 street");
    e1.setEmail("q@maiil.ru");
    e1.setPersonalDataResponsible(true);
    e1.setPhoneNumber("076666666");

    EmployeeEntity e2 = new EmployeeEntity();
    e2.setDepartment(department);
    e2.setFirstName("Vasile");
    e2.setLastName("Vasile");
    e2.setAddress("53 street");
    e2.setEmail("q@maiil.ru");
    e2.setPersonalDataResponsible(true);
    e2.setPhoneNumber("076666666");

    employeeRepository.save(e1);
    employeeRepository.save(e2);

    
    savedEmployeeId1 = e1.getId();
    savedEmployeeId2 = e2.getId();

    Assertions.assertTrue(savedEmployeeId1 > 0);
    Assertions.assertTrue(savedEmployeeId2 > 0);
  }

  
  @Order(3)
  @Test
  void updateTest(){
    EmployeeEntity employeeEntity = employeeRepository.findById(savedEmployeeId1).get();
    employeeEntity.setFirstName("ZZZZAjadkhfjkad");
    employeeEntity.setLastName("Ajadkhfjkad");

    employeeRepository.update(employeeEntity);
  }

  @Order(4)
  @Test
  void findByIdTest(){
    EmployeeEntity employeeEntity1 = employeeRepository.findById(savedEmployeeId1).get();
    Assertions.assertNotNull(employeeEntity1);
    Assertions.assertEquals(employeeEntity1.getFirstName(), "ZZZZAjadkhfjkad");
    Assertions.assertEquals(employeeEntity1.getLastName(), "Ajadkhfjkad");

    EmployeeEntity employeeEntity2 = employeeRepository.findById(savedEmployeeId2).get();
    Assertions.assertNotNull(employeeEntity2);
    Assertions.assertEquals(employeeEntity2.getFirstName(), "Vasile");
    Assertions.assertEquals(employeeEntity2.getLastName(), "Vasile");
  }

  @Order(5)
  @Test
  void countTest(){
    Long count = employeeRepository.count();
    Assertions.assertEquals(count, INITIAL_EMPLOYEE_COUNT + 2);
  }

  @Order(6)
  @Test
  void removeByIdTest(){
    employeeRepository.removeById(savedEmployeeId1);
    employeeRepository.removeById(savedEmployeeId2);
    
    Long count = employeeRepository.count();
    Assertions.assertEquals(count, INITIAL_EMPLOYEE_COUNT);
  }
  
}
