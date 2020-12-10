package com.app.domain.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonalInfoRequestFromPeopleResponseDto {
  
  Long personalInfoRequestId;

  private String firstName;
  
  private String lastName;
  
  private String email;

  private String phone;

  private String requestedRight;

  private String comment;

  private Long organisationId;

  private String organisationName;

  @JsonFormat(
    shape = JsonFormat.Shape.STRING,
    pattern = "yyyy-MM-dd")
  private Date requestedAt;

  private boolean processed;

}
