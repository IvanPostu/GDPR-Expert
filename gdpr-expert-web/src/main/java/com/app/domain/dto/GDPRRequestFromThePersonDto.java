package com.app.domain.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GDPRRequestFromThePersonDto {
  
  @NotBlank(message = "Este necesar de introdus prenumele.")
  private String firstName;
  
  @NotBlank(message = "Este necesar de introdus numele de familie.")
  private String lastName;
  
  @NotBlank(message = "Este necesar de introdus poșta electronică.")
  private String email;

  @NotBlank(message = "Este necesar de introdus numărul de telefon.")
  private String phone;

  @NotBlank(message = "Selectați dreptul solicitat.")
  private String requestedRight;

  @NotBlank(message = "Este necesar de introdus comentariu relativ la solicitare .")
  private String comment;

  @NotNull(message = "Selectați organizația")
  private Long organisationId;


}
