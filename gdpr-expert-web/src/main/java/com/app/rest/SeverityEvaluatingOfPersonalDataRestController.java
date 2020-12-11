package com.app.rest;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import com.app.domain.entities.UserEntity;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/severityEvaluatingOfPersonalData")
public class SeverityEvaluatingOfPersonalDataRestController {

  private static final Logger logger = LogManager
    .getLogger(SeverityEvaluatingOfPersonalDataRestController.class);

  @RequestMapping(
    value = "/questions", 
    method = RequestMethod.GET, 
    produces = "application/json; charset=utf-8")
  public ResponseEntity<Object> getDepartmentById(@AuthenticationPrincipal UserEntity user) {
    try {

      logger.info("hellow");

      String pathToJson = "classpath:gdpr/METHODOLOGY_FOR_EVALUATING_THE_"
        + "SEVERITY_OF_PERSONAL_DATA_COMMITMENT.MD.json";

      File file = ResourceUtils.getFile(pathToJson);
      String jsonString = Files
        .readAllLines(file.toPath(), StandardCharsets.UTF_8)
        .stream()
        .reduce("", (a, c) -> a + c);

      return ResponseEntity.status(HttpStatus.OK).body(jsonString);
    } catch (IOException e) {
      logger.warn(e);
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
    }

  }

}
