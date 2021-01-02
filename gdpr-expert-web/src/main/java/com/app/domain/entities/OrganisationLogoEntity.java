package com.app.domain.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="organisation_logo", schema = "app")
@NoArgsConstructor
public class OrganisationLogoEntity {
  @Setter
  @Getter
  @Id
  @Column(name="organisation_id")
  private Long id;

  @Setter
  @Getter
  @Column(name = "image_data")
  private byte[] imageData;

  @Setter
  @Getter
  @MapsId
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "organisation_id")
  private OrganisationEntity organisation;

}
