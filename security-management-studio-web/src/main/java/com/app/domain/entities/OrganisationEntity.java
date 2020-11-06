package com.app.domain.entities;

import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Table(name="organisation", schema = "app")
public class OrganisationEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="organisation_id", unique = true)
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "legal_form")
  private String legalForm;

  @Column(name = "address")
  private String address;

  @Column(name = "administrator")
  private String administrator;

  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "email")
  private String email;

  @Column(name = "active")
  private Boolean active;

  @Column(name = "created_at")
  private LocalDateTime createdAt;
  
}
