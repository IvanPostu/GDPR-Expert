package com.app.domain.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

public class CreateOrganisationDto {
  

  @Setter
  @Getter
  @NotBlank(message="empty_name")
  private String organisationName;

  @Setter
  @Getter
  @NotBlank(message="empty_address")
  private String address;

  @Setter 
  @Getter
  @Email(message = "invalid_email")
  private String email;

  @Setter 
  @Getter
  @NotBlank(message="empty_telephone")
  private String telephone;

  @Setter 
  @Getter
  @NotBlank(message="empty_representative")
  private String legalRepresentative;

  @Setter 
  @Getter
  private String legalForm;

  @Setter 
  @Getter
  private String description;

  @Setter 
  @Getter
  @NotNull(message="null_image_data")
  private String base64LogoImage;

  @Setter 
  @Getter
  private String foundedAt;

}
