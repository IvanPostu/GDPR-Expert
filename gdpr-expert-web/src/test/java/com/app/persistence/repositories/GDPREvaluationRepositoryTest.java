package com.app.persistence.repositories;

import java.util.Date;
import java.util.List;

import com.app.domain.entities.GDPREvaluationEntity;
import com.app.domain.entities.OrganisationEntity;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@TestMethodOrder(OrderAnnotation.class)
public class GDPREvaluationRepositoryTest extends _RepositoriesConfiguration {

  @Autowired
  private OrganisationRepository organisationRepository;

  @Qualifier(value = "GDPREvaluationRepositoryImpl")
  @Autowired
  private GDPREvaluationRepository gdprEvaluationRepository;

  private static final Long INITIAL_COUNT = 7L;

  private static OrganisationEntity organisation;

  private static Long savedGDPREvaluationId1;
  private static Long savedGDPREvaluationId2;

  @Test
  @Order(1)
  public void setupTest(){
    Pageable pageable = PageRequest.of(0, 1, Sort.by("Id").ascending());
    List<OrganisationEntity> orgs = organisationRepository.findAll(pageable).getContent();
    organisation = orgs.get(0);

    Assertions.assertNotNull(organisation);
  }

  @Test
  @Order(2)
  public void saveTest(){
    GDPREvaluationEntity e1 = new GDPREvaluationEntity();
    e1.setCompletedAt(new Date());
    e1.setOrganisation(organisation);
    e1.setPercentageEstimation(77.7f);

    GDPREvaluationEntity e2 = new GDPREvaluationEntity();
    e2.setCompletedAt(new Date());
    e2.setOrganisation(organisation);
    e2.setPercentageEstimation(17.7f);

    gdprEvaluationRepository.save(e1);
    gdprEvaluationRepository.save(e2);

    savedGDPREvaluationId1 = e1.getId();
    savedGDPREvaluationId2 = e2.getId();

    Assertions.assertNotNull(savedGDPREvaluationId1);
    Assertions.assertNotNull(savedGDPREvaluationId2);
  }

  @Test
  @Order(3)
  public void findByIdTest(){
    GDPREvaluationEntity e1 = gdprEvaluationRepository.findById(savedGDPREvaluationId1).get();
    GDPREvaluationEntity e2 = gdprEvaluationRepository.findById(savedGDPREvaluationId2).get();

    Assertions.assertNotNull(e1);
    Assertions.assertNotNull(e2);
  }

  @Test
  @Order(4)
  public void countTest(){
    Long count = gdprEvaluationRepository.count();
    Assertions.assertEquals(count, INITIAL_COUNT + 2);
  }

  @Test
  @Order(5)
  void removeById(){
    gdprEvaluationRepository.removeById(savedGDPREvaluationId1);
    gdprEvaluationRepository.removeById(savedGDPREvaluationId2);

    Long count = gdprEvaluationRepository.count();
    Assertions.assertEquals(count, INITIAL_COUNT);
  }


}
