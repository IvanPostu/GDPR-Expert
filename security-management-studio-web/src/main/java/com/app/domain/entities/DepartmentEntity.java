package com.app.domain.entities;

import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Table(name="department", schema = "app")
public class DepartmentEntity {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="department_id", unique = true)
  private Long id;
  
  @Column(name = "name")
  private String name;

  @Column(name = "responsible")
  private String responsible;


  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "email")
  private String email;

  @Column(name = "active")
  private Boolean active;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

}
