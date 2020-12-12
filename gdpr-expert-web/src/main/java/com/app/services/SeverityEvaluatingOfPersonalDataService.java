package com.app.services;

import com.app.domain.dto.SeverityEvaluatingOfPersonalDataDto;
import com.app.domain.entities.SeverityEvaluatingOfPersonalDataEntity;

public interface SeverityEvaluatingOfPersonalDataService {
  
  void save (SeverityEvaluatingOfPersonalDataDto severityEvaluatingOfPersonalDataDto);

  SeverityEvaluatingOfPersonalDataEntity findById(Long severityEvaluatingOfPersonalDataId);

}
