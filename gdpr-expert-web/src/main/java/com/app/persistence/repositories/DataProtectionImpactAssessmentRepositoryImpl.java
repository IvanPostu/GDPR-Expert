package com.app.persistence.repositories;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.DataProtectionImpactAssessmentEntity;


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

  @Override
  public Long count() {
    final String hQuery = "SELECT COUNT(d.id) FROM DataProtectionImpactAssessmentEntity d";
    Long count = (Long)entityManager.createQuery(hQuery).getSingleResult();
  
    return count;
  }

  @Transactional
  @Override
  public void removeById(Long dataProtectionImpactAssessmentId) {
    final String hQuery = "DELETE FROM DataProtectionImpactAssessmentEntity a WHERE a.id=:paramId";
    entityManager
      .createQuery(hQuery)
      .setParameter("paramId", dataProtectionImpactAssessmentId)
      .executeUpdate();

  }

  
}
