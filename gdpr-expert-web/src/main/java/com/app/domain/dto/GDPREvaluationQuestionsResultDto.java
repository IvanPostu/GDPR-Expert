package com.app.domain.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GDPREvaluationQuestionsResultDto {
  
  @NotNull(message = "organisationId_null")
  private Long organisationId;
  
  @NotNull(message = "percentages_null")
  @Min(value = 0, message = "percentages_min_0_max_100")
  @Max(value = 100, message = "percentages_min_0_max_100")
  private Float percentages;

}
