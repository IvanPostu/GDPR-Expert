package com.app.rest;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Validation;
import javax.validation.Validator;

import com.app.beans.ApplicationDateFormatter;
import com.app.domain.dto.GDPREvaluationQuestionsDto;
import com.app.domain.dto.GDPREvaluationQuestionsResultDto;
import com.app.domain.entities.GDPREvaluationEntity;
import com.app.domain.entities.AuthUserEntity;
import com.app.services.GDPREvaluationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/gdpr/evaluation")
public class GDPREvaluationRestController {

  private final GDPREvaluationService gDPREvaluationService;
  private final ApplicationDateFormatter applicationDateFormatter;

  @Autowired
  public GDPREvaluationRestController(GDPREvaluationService gDPREvaluationService,
      ApplicationDateFormatter applicationDateFormatter) {
    this.gDPREvaluationService = gDPREvaluationService;
    this.applicationDateFormatter = applicationDateFormatter;
  }

  @RequestMapping(value = "", method = RequestMethod.GET)
  public ResponseEntity<GDPREvaluationQuestionsDto> getGDPREvaluationQuestions(@AuthenticationPrincipal AuthUserEntity user)
      throws IOException {

    GDPREvaluationQuestionsDto questions = gDPREvaluationService.getQuestions();

    return ResponseEntity.status(HttpStatus.OK).body(questions);
  }

  @RequestMapping(value = "", method = RequestMethod.POST)
  public ResponseEntity<?> evaluateOrganisation(@AuthenticationPrincipal AuthUserEntity user,
      @RequestBody GDPREvaluationQuestionsResultDto dto) {

    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    List<String> errorMessages = validator.validate(dto).stream().map(a -> a.getMessage()).collect(Collectors.toList());

    if (errorMessages.size() > 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
    }

    gDPREvaluationService.saveEvaluationResult(dto.getOrganisationId(), dto.getPercentages());

    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @RequestMapping(value = "/results", method = RequestMethod.GET)
  public ResponseEntity<?> getEvaluationsResults(@AuthenticationPrincipal AuthUserEntity user,
      @RequestParam(value = "organisationId") Long organisationId,
      @RequestParam(value = "limit") Short maxEvaluationsCount) {

    maxEvaluationsCount = maxEvaluationsCount > 10 ? 10 : maxEvaluationsCount;
    maxEvaluationsCount = maxEvaluationsCount < 0 ? 1 : maxEvaluationsCount;

    List<GDPREvaluationEntity> evaluations = gDPREvaluationService.getEvaluationResults(organisationId,
        maxEvaluationsCount);

    List<Map<String, Object>> result = new ArrayList<>(evaluations.size());

    evaluations.forEach(a -> {
      Map<String, Object> item = new HashMap<>();
      item.put("id", a.getId());
      item.put("percentageEstimation", a.getPercentageEstimation());
      try {
        item.put("completedAt", applicationDateFormatter.format(a.getCompletedAt()));
      } catch (ParseException e) {
        e.printStackTrace();
      }

      result.add(item);
    });

    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

}
