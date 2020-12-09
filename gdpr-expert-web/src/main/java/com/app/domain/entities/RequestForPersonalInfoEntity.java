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
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Entity
@Table(name = "request_for_personal_info", schema = "app")
public class RequestForPersonalInfoEntity {
  
  @Setter
  @Getter
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "request_for_personal_info_id")
  private Long id;

  @Setter
  @Getter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="organisation_id")
  private OrganisationEntity organisation;

  @Setter
  @Getter
  @Column(name = "is_processed")
  private boolean processed;


  @Setter
  @Getter
  @Column(name = "requested_at")
  private Date requestedAt;

  @Setter
  @Getter
  @Column(name = "requested_right")
  private String requestedRight;

  @Setter
  @Getter
  @Column(name = "comment")
  private String comment;

  @Setter
  @Getter
  @Column(name = "person_firstname")
  private String personFirstname;

  @Setter
  @Getter
  @Column(name = "person_lastname")
  private String personLastname;

  @Setter
  @Getter
  @Column(name = "person_email")
  private String personEmail;

  @Setter
  @Getter
  @Column(name = "person_phone_number")
  private String personPhoneNumber;

}
