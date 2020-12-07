package com.app.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GDPRRequestFromThePersonDto {
  
  private String firstName;
  private String lastName;
  private String email;
  private String phone;
  private String requestedRight;
  private String comment;

}
