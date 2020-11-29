package com.app.rest;

import java.io.IOException;

import com.app.domain.dto.GDPREvaluationQuestionsDto;
import com.app.domain.entities.UserEntity;
import com.app.services.GDPREvaluationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/gdpr/evaluation")
public class GDPREvaluationRestController {

  private final GDPREvaluationService gDPREvaluationService;

  @Autowired
  public GDPREvaluationRestController (GDPREvaluationService gDPREvaluationService){
    this.gDPREvaluationService = gDPREvaluationService;
  }

  @RequestMapping(value = "", method = RequestMethod.GET)
  public ResponseEntity<GDPREvaluationQuestionsDto> getGDPREvaluationQuestions(@AuthenticationPrincipal UserEntity user) throws IOException {

    GDPREvaluationQuestionsDto questions = gDPREvaluationService.getQuestions();

    return ResponseEntity.status(HttpStatus.OK).body(questions);
  }

}
