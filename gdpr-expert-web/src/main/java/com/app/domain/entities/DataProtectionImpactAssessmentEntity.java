package com.app.domain.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name="data_protection_impact_assessment", schema = "app")
public class DataProtectionImpactAssessmentEntity {
  
  /**
   * OneToOne by PK
   */
  @Id
  @Column(name="data_processing_activity_id")
  private Long id;

  @Column(name = "document_file")
  private byte[] documentFile;

  @Column(name="file_name")
  private String fileName;

  @OneToOne(fetch = FetchType.LAZY)
  // @MapsId
  @JoinColumn(
    name = "data_processing_activity_id", 
    referencedColumnName = "data_processing_activity_id")
  private DataProcessingActivityEntity dataProcessingActivity;

}
