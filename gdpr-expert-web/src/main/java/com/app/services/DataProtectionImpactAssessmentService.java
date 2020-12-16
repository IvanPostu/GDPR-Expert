package com.app.services;

import com.app.domain.dto.DataProtectionImpactAssessmentRequestDto;
import com.app.domain.entities.DataProtectionImpactAssessmentEntity;

public interface DataProtectionImpactAssessmentService {
  
  void evaluateDataProtectionImpactAssessment(DataProtectionImpactAssessmentRequestDto dataProtectionImpactAssessmentRequestDto);

  DataProtectionImpactAssessmentEntity getDataProtectionImpactAssessmentById(Long id);

}
