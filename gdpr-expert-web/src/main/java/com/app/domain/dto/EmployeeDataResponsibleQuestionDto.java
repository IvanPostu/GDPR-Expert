package com.app.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDataResponsibleQuestionDto {
  
  private Integer id;

  private String content;
  
  private String[] variants;

  private Integer[] variantsId;

  private String keyword;

}
