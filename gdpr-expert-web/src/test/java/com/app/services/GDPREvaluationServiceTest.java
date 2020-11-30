package com.app.services;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Assertions;

import com.app.domain.dto.GDPREvaluationQuestionsDto;

import org.junit.jupiter.api.Test;

public class GDPREvaluationServiceTest {

  @Test
  public void getQuestionsMethodTest() throws IOException {
    GDPREvaluationService service = new GDPREvaluationServiceImpl(null, null);
    GDPREvaluationQuestionsDto dto = service.getQuestions();
    Assertions.assertNotNull(dto);
    Assertions.assertNotNull(dto.getCategories());
    Assertions.assertEquals(dto.getCategories().size(), 6);
    Assertions.assertEquals(dto.getQuestions().size(), 32);
    

  } 

  @Test
  public void questionsHaveUniqueIds() throws IOException {
    GDPREvaluationService service = new GDPREvaluationServiceImpl(null, null);
    GDPREvaluationQuestionsDto dto = service.getQuestions();

    Set<Integer> ids = dto.getQuestions()
      .stream()
      .map(a -> a.getId())
      .collect(Collectors.toSet());

    int setSize = ids.size();
    int questionsSize = dto.getQuestions().size();

    if(setSize != questionsSize){
      throw new RuntimeException("GDPR evaluation questions id is not unique!!!"); 
    }

  }
  

}
