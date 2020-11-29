package com.app.services;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import com.app.domain.dto.GDPREvaluationQuestionsDto;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.util.ResourceUtils;

public class GDPREvaluationServiceImpl implements GDPREvaluationService {

  @Override
  public GDPREvaluationQuestionsDto getQuestions() throws IOException {
    
    ObjectMapper objectMapper = new ObjectMapper();
    File file = ResourceUtils.getFile("classpath:RGPD_evaluation.MD.json");
    String json = Files.readAllLines(file.toPath(), StandardCharsets.UTF_8)
      .stream()
      .reduce("", (a, c) -> a + c);
    
    GDPREvaluationQuestionsDto result = objectMapper
      .readValue(json, GDPREvaluationQuestionsDto.class);

    
    return result;
  }
  
}
