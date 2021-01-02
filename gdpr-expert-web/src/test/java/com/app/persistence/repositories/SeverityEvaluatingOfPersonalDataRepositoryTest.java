package com.app.persistence.repositories;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import com.app.domain.entities.DataProcessingActivityEntity;
import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.SeverityEvaluatingOfPersonalDataEntity;
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
public class SeverityEvaluatingOfPersonalDataRepositoryTest extends _RepositoriesConfiguration {

  @Autowired
  private SeverityEvaluatingOfPersonalDataRepository severityEvaluatingOfPersonalDataRepository;

  @Autowired
  private OrganisationRepository organisationRepository;

  private static final Long INITIAL_COUNT = 4L;

  private static DataProcessingActivityEntity dataProcessingActivity1;
  private static DataProcessingActivityEntity dataProcessingActivity2;

  private static Long savedSeverityEvaluationId1;
  private static Long savedSeverityEvaluationId2;

  @Test
  @Order(1)
  @Transactional
  public void setupTest(){
    Pageable pageable = PageRequest.of(1, 1, Sort.by("Id").ascending());
    List<OrganisationEntity> orgs = organisationRepository.findAll(pageable).getContent();
    OrganisationEntity organisation = orgs.get(0);
    
    List<DataProcessingActivityEntity> activities = organisation.getDataProcessingActivities();
    Assertions.assertEquals(activities.size(), 2);

    dataProcessingActivity1 = activities.get(0);
    dataProcessingActivity2 = activities.get(1);

    Assertions.assertNotNull(dataProcessingActivity1);
    Assertions.assertNotNull(dataProcessingActivity2);
  }

  @Test
  @Order(2)
  public void saveTest(){
    SeverityEvaluatingOfPersonalDataEntity e1 = new SeverityEvaluatingOfPersonalDataEntity();
    e1.setCircumstancesOfCompromiseGrade((short)1);
    e1.setDataProcessingContextGrade((short)1);
    e1.setEaseOfIdentificationGrade((short)1);
    e1.setEvaluatedAt(new Date());
    e1.setId(dataProcessingActivity1.getId());

    SeverityEvaluatingOfPersonalDataEntity e2 = new SeverityEvaluatingOfPersonalDataEntity();
    e2.setCircumstancesOfCompromiseGrade((short)2);
    e2.setDataProcessingContextGrade((short)2);
    e2.setEaseOfIdentificationGrade((short)2);
    e2.setEvaluatedAt(new Date());
    e2.setId(dataProcessingActivity2.getId());

    severityEvaluatingOfPersonalDataRepository.save(e1);
    severityEvaluatingOfPersonalDataRepository.save(e2);

    savedSeverityEvaluationId1 = e1.getId();
    savedSeverityEvaluationId2 = e2.getId();

    Assertions.assertNotNull(savedSeverityEvaluationId1);
    Assertions.assertNotNull(savedSeverityEvaluationId2);

    
  }

  @Test
  @Order(3)
  public void findByIdTest(){
    SeverityEvaluatingOfPersonalDataEntity e1 = severityEvaluatingOfPersonalDataRepository
      .findById(dataProcessingActivity1.getId());
    SeverityEvaluatingOfPersonalDataEntity e2 = severityEvaluatingOfPersonalDataRepository
      .findById(dataProcessingActivity2.getId());

    Assertions.assertNotNull(e1);
    Assertions.assertNotNull(e2);  
  }

  @Test
  @Order(4)
  public void countTest(){
    Long count = severityEvaluatingOfPersonalDataRepository.count();
    Assertions.assertEquals(count, INITIAL_COUNT + 2);
  }

  @Test
  @Order(5)
  void removeByIdTest(){
    Long count1 = severityEvaluatingOfPersonalDataRepository.count();
    
    severityEvaluatingOfPersonalDataRepository.removeById(savedSeverityEvaluationId1);
    severityEvaluatingOfPersonalDataRepository.removeById(savedSeverityEvaluationId2);

    Long count2 = severityEvaluatingOfPersonalDataRepository.count();

    Assertions.assertEquals(count1, count2 + 2);
  }


}