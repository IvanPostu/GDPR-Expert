package com.app.domain.dto;

import lombok.Getter;
import lombok.Setter;

public class CreateOrganisationDto {
  
  @Setter
  @Getter
  private String organisationName;

  @Setter
  @Getter
  private String address;

  @Setter 
  @Getter
  private String email;

  @Setter 
  @Getter
  private String telephone;

  @Setter 
  @Getter
  private String legalRepresentative;

  @Setter 
  @Getter
  private String legalForm;

  @Setter 
  @Getter
  private String description;

  @Setter 
  @Getter
  private String base64LogoImage;

}
