package com.app.persistence.repositories;

import com.app.domain.entities.DataProtectionImpactAssessmentEntity;

public interface DataProtectionImpactAssessmentRepository {
  
  void save(DataProtectionImpactAssessmentEntity dataProtectionImpactAssessmentEntity);
  
  DataProtectionImpactAssessmentEntity getById(Long dataProtectionImpactAssessmentId);

}
