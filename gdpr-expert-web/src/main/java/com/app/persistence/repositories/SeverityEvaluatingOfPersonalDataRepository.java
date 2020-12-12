package com.app.persistence.repositories;

import com.app.domain.entities.SeverityEvaluatingOfPersonalDataEntity;

import org.springframework.data.repository.Repository;

public interface SeverityEvaluatingOfPersonalDataRepository extends Repository<SeverityEvaluatingOfPersonalDataEntity, Long> {
  
  void save(SeverityEvaluatingOfPersonalDataEntity severityEvaluatingOfPersonalDataEntity);

  SeverityEvaluatingOfPersonalDataEntity findById(Long severityEvaluatingOfPersonalDataId);

}
