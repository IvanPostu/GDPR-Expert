package com.app.domain.entities;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
  @Column(name = "description")
  private String description;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
  @Setter 
  @Getter
  @Column(name = "created_on_platform_at", columnDefinition = "TIMESTAMP")
  private LocalDateTime createdOnPlatformAt;
  
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
  @Setter 
  @Getter
  @Column(name = "founded_at", columnDefinition = "DATE")
  private Date foundedAt;
  
  @JsonIgnore
  @Setter 
  @Getter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="user_owner_id")
  private UserEntity owner;

  @JsonIgnore
  @Setter 
  @Getter
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="organisation_id")
  private OrganisationLogoEntity organisationLogoEntity;

  @JsonIgnore
  @Setter 
  @Getter
  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumn(name="organisation_id")
  private List<DepartmentEntity> depatrments;

  @Override
  public boolean equals(Object o) {
    if(this == o){
      return true;
    }

    if(o == null){
      return false;
    }

    if(getClass() != o.getClass()){
      return false;
    }

    OrganisationEntity obj = (OrganisationEntity)o;
    return Objects.equals(obj.getId(), getId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId());
  }
}
