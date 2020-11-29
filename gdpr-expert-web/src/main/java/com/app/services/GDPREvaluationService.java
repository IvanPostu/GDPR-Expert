package com.app.services;

import java.io.IOException;

import com.app.domain.dto.GDPREvaluationQuestionsDto;

public interface GDPREvaluationService {
  
  GDPREvaluationQuestionsDto getQuestions() throws IOException;

}
