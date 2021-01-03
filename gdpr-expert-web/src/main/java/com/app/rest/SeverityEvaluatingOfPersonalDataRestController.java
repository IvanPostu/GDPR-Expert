package com.app.rest;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import com.app.beans.ApplicationDateFormatter;
import com.app.beans.MethodologyForEvaluatingTheSeverityOfPersonalDataCommitment;
import com.app.beans.MethodologyForEvaluatingTheSeverityOfPersonalDataCommitment.EvaluationResult;
import com.app.domain.dto.SeverityEvaluatingOfPersonalDataDto;
import com.app.domain.entities.SeverityEvaluatingOfPersonalDataEntity;
import com.app.domain.entities.AuthUserEntity;
import com.app.services.SeverityEvaluatingOfPersonalDataService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/severityEvaluatingOfPersonalData")
public class SeverityEvaluatingOfPersonalDataRestController {

  private static final Logger logger = LogManager.getLogger(SeverityEvaluatingOfPersonalDataRestController.class);

  private final SeverityEvaluatingOfPersonalDataService severityEvaluatingOfPersonalDataService;
  private final MethodologyForEvaluatingTheSeverityOfPersonalDataCommitment methodologyForEvaluatingTheSeverityOfPersonalDataCommitment;
  private final ApplicationDateFormatter dateFormatter;

  @Autowired
  public SeverityEvaluatingOfPersonalDataRestController(
      SeverityEvaluatingOfPersonalDataService severityEvaluatingOfPersonalDataService,
      MethodologyForEvaluatingTheSeverityOfPersonalDataCommitment methodologyForEvaluatingTheSeverityOfPersonalDataCommitment,
      ApplicationDateFormatter dateFormatter) {
    this.severityEvaluatingOfPersonalDataService = severityEvaluatingOfPersonalDataService;
    this.methodologyForEvaluatingTheSeverityOfPersonalDataCommitment = methodologyForEvaluatingTheSeverityOfPersonalDataCommitment;
    this.dateFormatter = dateFormatter;
  }

  @RequestMapping(value = "/questions", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
  public ResponseEntity<Object> getSeverityEvaluatingOfPersonalDataQuestions(@AuthenticationPrincipal AuthUserEntity user) {
    try {

      String pathToJson = "classpath:gdpr/METHODOLOGY_FOR_EVALUATING_THE_"
          + "SEVERITY_OF_PERSONAL_DATA_COMMITMENT.MD.json";

      File file = ResourceUtils.getFile(pathToJson);
      String jsonString = Files.readAllLines(file.toPath(), StandardCharsets.UTF_8).stream().reduce("",
          (a, c) -> a + c);

      logger.info("getSeverityEvaluatingOfPersonalDataQuestions REST controller method has been called.");
      return ResponseEntity.status(HttpStatus.OK).body(jsonString);
    } catch (IOException e) {
      logger.warn(e);
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
    }
  }

  @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> addSeverityEvaluatingOfPersonalData(@AuthenticationPrincipal AuthUserEntity user,
      @RequestBody SeverityEvaluatingOfPersonalDataDto severityEvaluatingOfPersonalDataDto) {

    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
    Set<ConstraintViolation<SeverityEvaluatingOfPersonalDataDto>> violations = validator
        .validate(severityEvaluatingOfPersonalDataDto);

    if (violations.size() > 0) {
      List<String> errors = violations.stream().map(a -> a.getMessage()).collect(Collectors.toList());

      logger.info("Validation error on addSeverityEvaluatingOfPersonalData");
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(errors);
    }

    severityEvaluatingOfPersonalDataService.save(severityEvaluatingOfPersonalDataDto);

    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @RequestMapping(value = "/{processingActivityId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> getSeverityEvaluatingForDataprocessingActivit(@AuthenticationPrincipal AuthUserEntity user,
      @PathVariable(value = "processingActivityId") Long processingActivityId) throws ParseException {
    

    SeverityEvaluatingOfPersonalDataEntity severityEntity = severityEvaluatingOfPersonalDataService
      .findById(processingActivityId);

    if(severityEntity == null) {
      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    EvaluationResult evaluationResult =  methodologyForEvaluatingTheSeverityOfPersonalDataCommitment.evaluate(severityEntity.getDataProcessingContextGrade(), severityEntity.getEaseOfIdentificationGrade(), severityEntity.getCircumstancesOfCompromiseGrade());
    
    Map<String, Object> result = new HashMap<>();
    result.put("evaluationResult", evaluationResult);
    result.put("evaluationDate", dateFormatter.format(severityEntity.getEvaluatedAt()) );

    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
  

}
