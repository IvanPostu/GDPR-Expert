package com.app.persistence.repositories;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.DataProtectionImpactAssessmentEntity;

import org.springframework.stereotype.Repository;


@Repository
public class DataProtectionImpactAssessmentRepositoryImpl implements DataProtectionImpactAssessmentRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Transactional
  @Override
  public void save(DataProtectionImpactAssessmentEntity dataProtectionImpactAssessmentEntity) {
    DataProtectionImpactAssessmentEntity dataProtectionImpactAssessmentEntityFromDB = 
      getById(dataProtectionImpactAssessmentEntity.getId());
    
    if(dataProtectionImpactAssessmentEntityFromDB == null){
      entityManager.persist(dataProtectionImpactAssessmentEntity);
    }else{
      dataProtectionImpactAssessmentEntityFromDB.setDocumentFile(dataProtectionImpactAssessmentEntity.getDocumentFile());
      dataProtectionImpactAssessmentEntityFromDB.setFileName(dataProtectionImpactAssessmentEntity.getFileName());
      entityManager.persist(dataProtectionImpactAssessmentEntityFromDB);
    }
  }

  @Override
  public DataProtectionImpactAssessmentEntity getById(Long dataProtectionImpactAssessmentId) {
    DataProtectionImpactAssessmentEntity dataProtectionImpactAssessmentEntity = entityManager
      .find(DataProtectionImpactAssessmentEntity.class, dataProtectionImpactAssessmentId);
    
    return dataProtectionImpactAssessmentEntity;
  }
  
}
