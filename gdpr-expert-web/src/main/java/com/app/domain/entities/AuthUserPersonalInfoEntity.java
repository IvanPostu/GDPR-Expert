package com.app.domain.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "auth_user_personal_info", schema = "app")
@NoArgsConstructor
public class AuthUserPersonalInfoEntity {
  
  @Setter
  @Getter
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "auth_user_id", unique = true)
  private Long id;

  @Setter
  @Getter
  @MapsId
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "auth_user_id")
  private AuthUserEntity authUserEntity;

  @Setter
  @Getter
  @Column(name = "firstname")
  private String firstName;

  @Setter
  @Getter
  @Column(name = "lastname")
  private String lastName;

  @Setter
  @Getter
  @Column(name = "phone_number")
  private String phoneNumber;

  @Setter
  @Getter
  @Column(name = "date_of_birth")
  private Date dateOfBirth;
  
}
