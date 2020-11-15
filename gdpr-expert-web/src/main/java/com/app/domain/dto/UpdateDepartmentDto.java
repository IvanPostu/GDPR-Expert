package com.app.domain.dto;

import lombok.Data;

@Data
public class UpdateDepartmentDto {
  private Long id;

  private String responsiblePerson;

  private String name;

  private String phoneNumber;

  private String email;
}
