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
@Table(name="data_processing_activity", schema = "app")
@Getter
@Setter
public class DataProcessingActivityEntity {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="data_processing_activity_id", unique = true)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="organisation_id")
  private OrganisationEntity organisation;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="department_id")
  private DepartmentEntity department;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name="employee_id")
  private EmployeeEntity employee;

  @Column(name="activity_name")
  private String activityName;

  @Column(name="purposes")
  private String purposes;

  @Column(name="description")
  private String description;

  @Column(name="sensitive_data")
  private boolean sensitiveData;

  @Column(name="data_owner")
  private String dataOwner;

  @Column(name="status")
  private String status;

  @Column(name = "beginning_of_the_activity", columnDefinition = "DATE")
  private Date beginningOfTheActivity;

  @Column(name = "end_of_the_activity", columnDefinition = "DATE")
  private Date endOfTheActivity;


}
