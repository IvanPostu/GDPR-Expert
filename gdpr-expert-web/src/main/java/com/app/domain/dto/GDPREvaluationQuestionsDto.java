package com.app.domain.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GDPREvaluationQuestionsDto {

  @AllArgsConstructor
  @NoArgsConstructor
  @Data
  public static final class Question {
    private Integer id;
    private Integer categoryId;
    private String text;
  };

  private List<String> categories;

  private List<Question> questions;

}
