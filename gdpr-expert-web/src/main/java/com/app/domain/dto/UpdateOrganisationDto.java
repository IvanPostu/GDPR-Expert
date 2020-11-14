package com.app.domain.dto;

import lombok.Getter;
import lombok.Setter;

public class UpdateOrganisationDto extends CreateOrganisationDto {
  @Setter
  @Getter
  private Long id;

}
