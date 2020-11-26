package com.app.domain.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="department", schema = "app")
public class DepartmentEntity {
  
  @Id
  @Setter 
  @Getter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="department_id", unique = true)
  private Long id;
  
  @Setter 
  @Getter
  @Column(name = "name")
  private String name;

  @Setter 
  @Getter
  @Column(name = "responsible")
  private String responsible;


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

  
  @Setter 
  @Getter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="organisation_id")
  private OrganisationEntity organisation;

  
  @Setter 
  @Getter
  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumn(name="department_id")
  private List<EmployeeEntity> employees = new ArrayList<>();


}
