package com.app.persistence.repositories;

import java.util.List;

import javax.transaction.Transactional;

import com.app.domain.entities.DataProcessingActivityEntity;
import com.app.domain.entities.DataProtectionImpactAssessmentEntity;
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
public class DataProtectionImpactAssessmentRepositoryTest extends _RepositoriesConfiguration {
  
  @Autowired
  private OrganisationRepository organisationRepository;
  @Autowired
  private DataProtectionImpactAssessmentRepository dataProtectionImpactAssessmentRepository;

  private static final Long INITIAL_COUNT = 4L;
  private static DataProcessingActivityEntity dataProcessingActivity;
  private static Long savedDataProtectionImpactAssessmentEntityId;

  @Test
  @Order(1)
  @Transactional
  public void setupTest(){
    Pageable pageable = PageRequest.of(1, 1, Sort.by("Id").ascending());
    List<OrganisationEntity> orgs = organisationRepository.findAll(pageable).getContent();
    OrganisationEntity organisation = orgs.get(0);
    List<DataProcessingActivityEntity> activities = organisation.getDataProcessingActivities();
    dataProcessingActivity = activities.get(0);

    Assertions.assertNotNull(organisation);
    Assertions.assertNotNull(dataProcessingActivity);

  }

  @Test
  @Order(2)
  public void saveTest(){
    DataProtectionImpactAssessmentEntity e = new DataProtectionImpactAssessmentEntity();
    e.setDataProcessingActivity(dataProcessingActivity);
    e.setDocumentFile("adcdefgh111".getBytes());
    e.setFileName("test.doc");
    e.setId(dataProcessingActivity.getId());

    dataProtectionImpactAssessmentRepository.save(e);
    savedDataProtectionImpactAssessmentEntityId = e.getId();

    Assertions.assertNotNull(savedDataProtectionImpactAssessmentEntityId);
  }

  @Test
  @Order(3)
  public void getByIdTest(){
    DataProtectionImpactAssessmentEntity e = dataProtectionImpactAssessmentRepository
      .getById(savedDataProtectionImpactAssessmentEntityId);

    Assertions.assertNotNull(e);
  }

  @Test
  @Order(4)
  public void countTest(){
    Long count = dataProtectionImpactAssessmentRepository.count();
    Assertions.assertEquals(INITIAL_COUNT + 1, count);
  }

  @Test
  @Order(5)
  public void removeByIdTest(){
    dataProtectionImpactAssessmentRepository
      .removeById(savedDataProtectionImpactAssessmentEntityId);
    
    Long count = dataProtectionImpactAssessmentRepository.count();
    Assertions.assertEquals(INITIAL_COUNT, count);  
  }
}
