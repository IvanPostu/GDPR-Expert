package com.app.domain.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
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
  @Column(name="organisation_id", unique = true)
  private Long id;

  @Setter
  @Getter
  @Column(name = "image_data")
  private Byte[] imageData;
}
