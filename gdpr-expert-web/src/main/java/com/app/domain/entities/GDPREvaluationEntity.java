package com.app.domain.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="gdpr_evaluation", schema = "app")
public class GDPREvaluationEntity {
  
  @Id
  @Setter 
  @Getter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="gdpr_evaluation_id")
  private Long id;
  
  @Setter 
  @Getter
  @Column(name="percentage_estimation")
  private Float percentageEstimation;
  
  @Setter 
  @Getter
  @Column(name="completed_at")
  private Date completedAt;

  @Setter 
  @Getter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="organisation_id")
  private OrganisationEntity organisation;
  

}
