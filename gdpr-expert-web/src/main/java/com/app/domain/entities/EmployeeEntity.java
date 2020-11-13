package com.app.domain.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name="employee", schema = "app")
public class EmployeeEntity {
  @Id
  @Setter 
  @Getter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="employee_id", unique = true)
  private Long id;
  
  @Setter 
  @Getter
  @Column(name = "personal_data_responsible")
  private boolean personalDataResponsible;

  @Setter 
  @Getter
  @Column(name = "email")
  private String email;

  @Setter 
  @Getter
  @Column(name = "first_name")
  private String firstName;

  @Setter 
  @Getter
  @Column(name = "last_name")
  private String lastName;

  @Setter 
  @Getter
  @Column(name = "phone_number")
  private String phoneNumber;

  @Setter 
  @Getter
  @Column(name = "address")
  private String address;

  @JsonIgnore
  @Setter 
  @Getter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="department_id")
  private DepartmentEntity department;



}
