package com.app.domain.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UpdateEmployeeDto {
  
  @NotNull(message = "invalid_id")
  @Min(value = 1, message = "invalid_id")
  private Long id;

  private boolean personalDataResponsible;

  @NotBlank(message = "invalid_email")
  private String email;

  @NotBlank(message = "invalid_first_name")
  private String firstName;
  
  @NotBlank(message = "invalid_last_name")
  private String lastName;

  @NotBlank(message = "invalid_email")
  private String phoneNumber;

  @NotBlank(message = "invalid_address")
  private String address;


}
