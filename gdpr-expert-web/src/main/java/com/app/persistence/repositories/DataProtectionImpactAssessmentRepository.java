package com.app.persistence.repositories;

import com.app.domain.entities.DataProtectionImpactAssessmentEntity;
import org.springframework.data.repository.Repository;

public interface DataProtectionImpactAssessmentRepository 
  extends Repository<DataProtectionImpactAssessmentEntity, Long> 
{
  
  void save(DataProtectionImpactAssessmentEntity dataProtectionImpactAssessmentEntity);
  
  DataProtectionImpactAssessmentEntity getById(Long dataProtectionImpactAssessmentId);

  Long count();

  void removeById(Long dataProtectionImpactAssessmentId);

}
