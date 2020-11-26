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
@Table(name="employee_document", schema = "app")
public class EmployeeDocumentEntity {

  @Setter
  @Getter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Id
  @Column(name="employee_document_id")
  private Long employeeDocumentId;

  @Setter
  @Getter
  @Column(name="file_name")
  private String fileName;

  @Setter
  @Getter
  @Column(name = "document_data")
  private byte[] documentData;

  @Setter
  @Getter
  @Column(name = "uploaded_to_the_platform_at")
  private Date uploadedToThePlatformAt;

  @Setter 
  @Getter
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name="employee_id")
  private EmployeeEntity employee;



}
