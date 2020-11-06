package com.app.domain.entities;

import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="organisation", schema = "app")
public class OrganisationEntity {

  @Setter
  @Getter
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="organisation_id", unique = true)
  private Long id;

  @Setter
  @Getter
  @Column(name = "name")
  private String name;

  @Setter
  @Getter
  @Column(name = "legal_form")
  private String legalForm;

  @Setter
  @Getter
  @Column(name = "address")
  private String address;

  @Setter
  @Getter
  @Column(name = "administrator")
  private String administrator;

  @Setter 
  @Getter
  @Column(name = "phone_number")
  private String phoneNumber;

  @Setter 
  @Getter
  @Column(name = "email")
  private String email;

  @Setter 
  @Getter
  @Column(name = "active")
  private Boolean active;

  @Setter 
  @Getter
  @Column(name = "created_at")
  private LocalDateTime createdAt;
  
}
