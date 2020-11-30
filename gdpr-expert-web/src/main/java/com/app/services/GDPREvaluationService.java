package com.app.services;

import java.io.IOException;
import java.util.List;

import com.app.domain.dto.GDPREvaluationQuestionsDto;
import com.app.domain.entities.GDPREvaluationEntity;


public interface GDPREvaluationService {
  
  GDPREvaluationQuestionsDto getQuestions() throws IOException;

  void saveEvaluationResult(Long organisationId, Float percentageEstimation);

  List<GDPREvaluationEntity> getEvaluationResults(Long organisationId, Short limit);

}
