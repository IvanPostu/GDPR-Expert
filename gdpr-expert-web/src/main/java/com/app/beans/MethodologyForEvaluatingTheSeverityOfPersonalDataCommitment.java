package com.app.beans;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.util.ResourceUtils;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class MethodologyForEvaluatingTheSeverityOfPersonalDataCommitment {

  @Getter
  @AllArgsConstructor
  public static class EvaluationResult {
    String impactOnAffectedDataSubjects;
    String possibleConsequencesForDataSubjects;
    String notificationObligation;
  };

  private Map<String, EvaluationResult> results = new HashMap<>();

  public MethodologyForEvaluatingTheSeverityOfPersonalDataCommitment()
      throws JsonMappingException, JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();

    String json = "";

    try {
      File file = ResourceUtils
          .getFile("classpath:gdpr/METHODOLOGY_FOR_EVALUATING_THE_SEVERITY_OF_PERSONAL_DATA_COMMITMENT.MD.json");
      json = Files.readAllLines(file.toPath(), StandardCharsets.UTF_8).stream().reduce("", (a, c) -> a + c);
    } catch (IOException e) {
      throw new RuntimeException("gdpr/PersonalDataResponsibleQuestions.MD.json IO error.!!!");
    }

    JsonNode root = objectMapper.readTree(json);
    JsonNode evaluationInfo = root.get("evaluationInfo");

    String[] keys = {"lt_4", "e_4", "gt_4"};
    for(String k : keys){
      results.put(k, new EvaluationResult(
        evaluationInfo.get(k).get("impactOnAffectedDataSubjects").asText(),
        evaluationInfo.get(k).get("possibleConsequencesForDataSubjects").asText(),
        evaluationInfo.get(k).get("notificationObligation").asText())
      );
    }
  }

  public EvaluationResult evaluate(
    Short dataProcessingContextGrade,
    Short easeOfIdentificationGrade,
    Short circumstancesOfCompromiseGrade){

      // "CPD*UI+CC"
    int evaluatingGrade = dataProcessingContextGrade * easeOfIdentificationGrade + circumstancesOfCompromiseGrade;

    if(evaluatingGrade < 4) return results.get("lt_4");
    if(evaluatingGrade == 4) return results.get("e_4");
    // if(evaluatingGrade > 4)
    return results.get("gt_4");
  }
}