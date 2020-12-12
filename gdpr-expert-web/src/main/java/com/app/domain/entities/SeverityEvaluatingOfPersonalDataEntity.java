package com.app.domain.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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
  
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(
    name = "data_processing_activity_id", 
    referencedColumnName = "data_processing_activity_id")
  private DataProcessingActivityEntity dataProcessingActivity;

  @Column(name = "data_processing_context")
  private Short dataProcessingContextGrade;

  @Column(name = "ease_of_identification")
  private Short easeOfIdentificationGrade;

  @Column(name = "circumstances_of_compromise")
  private Short circumstancesOfCompromiseGrade;

  @Column(name = "evaluated_at")
  private Date evaluatedAt;


}
