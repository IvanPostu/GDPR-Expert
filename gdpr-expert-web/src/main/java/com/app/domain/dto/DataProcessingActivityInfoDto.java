package com.app.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DataProcessingActivityInfoDto {

 
    
  private Long    organisationId;
  private String  organisationName;

  private Long    activityId;
  private String  activityName;

  private String  departmentName;
  private Long    departmentId;

  private Long    dataResponsibleEmployeeId;
  private String  dataProcessingResponsibleEmployeeFullname;

  private boolean dataIsSensible;
  private String  dataOwner;
  private String  beginningOfTheActivity;      
  private String  endOfTheActivity;      
  private String  description;
  private String  purposes;
  private String  status;


}
