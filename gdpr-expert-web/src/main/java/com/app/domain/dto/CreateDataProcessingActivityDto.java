package com.app.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateDataProcessingActivityDto {
  
  private Long    organisationId;
  private Long    dataResponsibleEmployeeId;
  private Long    departmentId;
  private boolean dataIsSensible;
  private String  activityName;
  private String  dataOwner;
  private String  beginningOfTheActivity;      
  private String  endOfTheActivity;      
  private String  description;
  private String  purposes;
  private String  status;

}
