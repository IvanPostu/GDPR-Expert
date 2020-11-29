package com.app.services;

import java.io.IOException;
import org.junit.jupiter.api.Assertions;

import com.app.domain.dto.GDPREvaluationQuestionsDto;

import org.junit.jupiter.api.Test;

public class GDPREvaluationServiceTest {

  @Test
  public void getQuestionsMethodTest() throws IOException {
    GDPREvaluationService service = new GDPREvaluationServiceImpl();
    GDPREvaluationQuestionsDto dto = service.getQuestions();
    Assertions.assertNotNull(dto);
    Assertions.assertNotNull(dto.getCategories());
    Assertions.assertEquals(dto.getCategories().size(), 6);
    Assertions.assertEquals(dto.getQuestions().size(), 32);
    
  } 

}
