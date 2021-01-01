package com.app.persistence.repositories;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import com.app.domain.entities.DataProcessingActivityEntity;
import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.EmployeeEntity;
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
public class DataProcessingActivityRepositoryTest extends _RepositoriesConfiguration {
  
  @Autowired
  private DataProcessingActivityRepository dataProcessingActivityRepository;
  @Autowired
  private OrganisationRepository organisationRepository;

  private static final Long INITIAL_COUNT = 6L;

  private static DepartmentEntity department;
  private static OrganisationEntity organisation;
  private static EmployeeEntity employee;
  private static UserEntity user;

  private static Long savedActivityId1;
  private static Long savedActivityId2;

  @Order(1)
  @Test
  @Transactional
  public void setupTest(){
    Pageable pageable = PageRequest.of(0, 1, Sort.by("Id").ascending());
    organisation = organisationRepository.findAll(pageable).getContent().get(0);
    department = organisation.getDepatrments().get(0);
    employee = department.getEmployees().get(0);
    user = organisation.getOwner();

    Assertions.assertNotNull(organisation);
    Assertions.assertNotNull(department);
    Assertions.assertNotNull(employee);
    Assertions.assertNotNull(user);
  }

  @Order(2)
  @Test
  public void saveTest(){
    DataProcessingActivityEntity activity1 = new DataProcessingActivityEntity();
    activity1.setActivityName("activityname1");
    activity1.setEndOfTheActivity(new Date());
    activity1.setBeginningOfTheActivity(new Date());
    activity1.setDataOwner("Mikey Jimm");
    activity1.setDepartment(department);
    activity1.setDescription("description ...");
    activity1.setEmployee(employee);
    activity1.setOrganisation(organisation);
    activity1.setPurposes("purposes");
    activity1.setSensitiveData(true);
    activity1.setStatus("active");

    DataProcessingActivityEntity activity2 = new DataProcessingActivityEntity();
    activity2.setActivityName("activityname1");
    activity2.setEndOfTheActivity(new Date());
    activity2.setBeginningOfTheActivity(new Date());
    activity2.setDataOwner("Mikey Jimm");
    activity2.setDepartment(department);
    activity2.setDescription("description ...");
    activity2.setEmployee(employee);
    activity2.setOrganisation(organisation);
    activity2.setPurposes("purposes");
    activity2.setSensitiveData(true);
    activity2.setStatus("active");

    dataProcessingActivityRepository.save(activity1);
    dataProcessingActivityRepository.save(activity2);

    savedActivityId1 = activity1.getId();
    savedActivityId2 = activity2.getId();

    Assertions.assertNotNull(savedActivityId1);
    Assertions.assertNotNull(savedActivityId2);
  }

  @Test
  @Order(3)
  public void getDataProcessingActivitiesForOrganisationTest(){
    Long organisationId = organisation.getId();
    Long userId = user.getId();

    List<DataProcessingActivityEntity> activities = dataProcessingActivityRepository
      .getDataProcessingActivitiesForOrganisation(userId, organisationId);

    Assertions.assertNotNull(activities);
    Assertions.assertTrue(activities.size()>=2);
  }

  @Test
  @Order(4)
  public void getDataProcessingActivitiesForDepartmentTest(){
    Long departmentId = department.getId();
    Long userId = user.getId();

    List<DataProcessingActivityEntity> activities = dataProcessingActivityRepository
      .getDataProcessingActivitiesForDepartment(userId, departmentId);

    Assertions.assertNotNull(activities);
    Assertions.assertTrue(activities.size()>=2);
  }

  @Test
  @Order(5)
  public void getDataProcessingActivityById(){
    DataProcessingActivityEntity activity1 = dataProcessingActivityRepository
      .getDataProcessingActivityById(savedActivityId1);
    DataProcessingActivityEntity activity2 = dataProcessingActivityRepository
      .getDataProcessingActivityById(savedActivityId2);

    Assertions.assertNotNull(activity1);
    Assertions.assertNotNull(activity2);
  }

  @Test
  @Order(6)
  public void countTest(){
    Long count = dataProcessingActivityRepository
      .count();

    Assertions.assertEquals(count, INITIAL_COUNT + 2);
  }


  @Test
  @Order(7)
  public void removeByIdTest(){
    dataProcessingActivityRepository.removeById(savedActivityId1);
    dataProcessingActivityRepository.removeById(savedActivityId2);

    Long count = dataProcessingActivityRepository
      .count();

    Assertions.assertEquals(count, INITIAL_COUNT);    
  }
  
}
