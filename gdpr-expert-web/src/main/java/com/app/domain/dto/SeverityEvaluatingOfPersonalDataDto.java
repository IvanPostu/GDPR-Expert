package com.app.domain.dto;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeverityEvaluatingOfPersonalDataDto {
  
  @NotNull(message = "dataProcessingActivityId IS NULL")
  private Long dataProcessingActivityId;

  //CPD
  private Short dataProcessingContextGrade;
  
  //UI
  private Short easeOfIdentificationGrade;
  
  //CC
  private Short circumstancesOfCompromiseGrade;

  @JsonFormat(
    shape = JsonFormat.Shape.STRING,
    pattern = "yyyy-MM-dd")
  Date evaluatedAt;

}
