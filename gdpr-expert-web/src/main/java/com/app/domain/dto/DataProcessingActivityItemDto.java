package com.app.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DataProcessingActivityItemDto {
  
  private Long activityId;
  private String activityName;

  private String organisationName;
  private Long organisationId;

  private String departmentName;
  private Long departmentId;

  private String dataProcessingResponsibleEmployeeFullname;
  private String dataOwnerFullname;
  private String processingPurposes;
  private String status;


}
