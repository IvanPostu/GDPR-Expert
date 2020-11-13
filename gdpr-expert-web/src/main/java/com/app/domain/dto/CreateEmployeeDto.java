package com.app.domain.dto;

import lombok.Data;

@Data
public class CreateEmployeeDto {
  
  private Long departmentId;

  private boolean personalDataResponsible;

  private String email;

  private String firstName;
  
  private String lastName;

  private String phoneNumber;

  private String address;


}
