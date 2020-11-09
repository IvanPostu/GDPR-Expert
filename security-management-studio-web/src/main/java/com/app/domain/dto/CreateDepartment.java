package com.app.domain.dto;

import lombok.Data;

@Data
public class CreateDepartment {
  private Long organisationId;

  private String responsiblePerson;

  private String name;

  private String phoneNumber;

  private String email;

}
