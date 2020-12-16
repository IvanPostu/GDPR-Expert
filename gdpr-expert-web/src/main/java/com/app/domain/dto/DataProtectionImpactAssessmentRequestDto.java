package com.app.domain.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DataProtectionImpactAssessmentRequestDto {
  
  @NotNull
  private Long dataProcessingActivityId; 


  private String stageOneDataDetails;

  
  private String stageTwoCurrentSetOfMeasures;

  
  private String stageThreeSourcesOfRisk;

  
  private String stageFourPotentialAdverseEventsAndThreats;

  
  private String stageFiveSummaryAnalysisAndCurrentControls;

}
