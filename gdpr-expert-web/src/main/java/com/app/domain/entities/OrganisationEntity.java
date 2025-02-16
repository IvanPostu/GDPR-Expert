package com.app.domain.entities;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "OrganisationEntity")
@Table(name="organisation", schema = "app")
public class OrganisationEntity {

  @Setter
  @Getter
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="organisation_id")
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

  @Setter 
  @Getter
  @Column(name = "created_on_platform_at", columnDefinition = "TIMESTAMP")
  private LocalDateTime createdOnPlatformAt;
  
  @Setter 
  @Getter
  @Column(name = "founded_at", columnDefinition = "DATE")
  private Date foundedAt;
  
  @Setter 
  @Getter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="user_owner_id")
  private AuthUserEntity owner;

  
  @Setter 
  @Getter
  @OneToOne(fetch = FetchType.LAZY)
  @PrimaryKeyJoinColumn
  private OrganisationLogoEntity organisationLogoEntity;


  @Setter 
  @Getter
  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumn(name="organisation_id")
  private List<DepartmentEntity> depatrments ;

  @Setter 
  @Getter
  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumn(name="organisation_id")
  private List<DataProcessingActivityEntity> dataProcessingActivities ;


  @Setter 
  @Getter
  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumn(name="organisation_id")
  private List<GDPREvaluationEntity> evaluations ;

  @Setter 
  @Getter
  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumn(name="organisation_id")
  private List<RequestForPersonalInfoEntity> requestForPersonalInfo ;

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
