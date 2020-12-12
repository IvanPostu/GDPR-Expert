package com.app.domain.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="severity_evaluating_of_personal_data", schema = "app")
public class SeverityEvaluatingOfPersonalDataEntity {
  
  @Id
  @Column(name="data_processing_activity_id")
  private Long id;
  
  @Column(name = "data_processing_context")
  private Short dataProcessingContextGrade;

  @Column(name = "ease_of_identification")
  private Short easeOfIdentificationGrade;

  @Column(name = "circumstances_of_compromise")
  private Short circumstancesOfCompromiseGrade;

}
