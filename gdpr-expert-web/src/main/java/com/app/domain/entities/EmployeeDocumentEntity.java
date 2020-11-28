package com.app.domain.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="employee_document", schema = "app")
@NoArgsConstructor
public class EmployeeDocumentEntity {

  @Setter
  @Getter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Id
  @Column(name="employee_document_id")
  private Long employeeDocumentId;

  @Setter 
  @Getter
  @Column(name="employee_id")
  private Long  employeeId;

  @Setter
  @Getter
  @Column(name="file_name")
  private String fileName;

  public EmployeeDocumentEntity(Long employeeDocumentId, Long employeeId, String fileName, Date uploadedToThePlatformAt){
    this.employeeDocumentId = employeeDocumentId;
    this.employeeId = employeeId;
    this.fileName = fileName;
    this.uploadedToThePlatformAt = uploadedToThePlatformAt;
  }


  @Setter
  @Getter
  @Column(name = "uploaded_to_the_platform_at")
  private Date uploadedToThePlatformAt;

  @Setter
  @Getter
  @Column(name = "document_data")
  private byte[] documentData;


}
