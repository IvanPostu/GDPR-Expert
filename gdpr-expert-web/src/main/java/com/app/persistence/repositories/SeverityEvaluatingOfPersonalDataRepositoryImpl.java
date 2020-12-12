package com.app.persistence.repositories;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.SeverityEvaluatingOfPersonalDataEntity;

public class SeverityEvaluatingOfPersonalDataRepositoryImpl implements SeverityEvaluatingOfPersonalDataRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Transactional
  @Override
  public void save(SeverityEvaluatingOfPersonalDataEntity severityEvaluatingOfPersonalDataEntity) {
    SeverityEvaluatingOfPersonalDataEntity objectFromDb = entityManager
      .find(SeverityEvaluatingOfPersonalDataEntity.class, 
        severityEvaluatingOfPersonalDataEntity.getId());

    if(objectFromDb != null){
      objectFromDb.setCircumstancesOfCompromiseGrade(severityEvaluatingOfPersonalDataEntity.getCircumstancesOfCompromiseGrade());
      objectFromDb.setDataProcessingContextGrade(severityEvaluatingOfPersonalDataEntity.getDataProcessingContextGrade());
      objectFromDb.setEaseOfIdentificationGrade(severityEvaluatingOfPersonalDataEntity.getEaseOfIdentificationGrade());
      objectFromDb.setEvaluatedAt(severityEvaluatingOfPersonalDataEntity.getEvaluatedAt());

      entityManager.persist(objectFromDb);
      severityEvaluatingOfPersonalDataEntity = objectFromDb;
    }else{
      entityManager.persist(severityEvaluatingOfPersonalDataEntity);
    }
  }

  @Override
  public SeverityEvaluatingOfPersonalDataEntity findById(Long severityEvaluatingOfPersonalDataId) {
    SeverityEvaluatingOfPersonalDataEntity objectFromDb = entityManager
      .find(SeverityEvaluatingOfPersonalDataEntity.class, severityEvaluatingOfPersonalDataId);
    
    return objectFromDb;
  }
  
}
