package com.app.domain.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="user", schema = "app")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="user_id", unique = true)
  private Long id;
  
  @Column(name = "active")
  private Boolean active;

  @Column(name = "email")
  private String email;

  @Column(name = "password")
  private String password;

  @OneToMany(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  private List<UserRoleEntity> roles = new ArrayList<>();

  public Boolean isActive() {
    return active;
  }

  public String getEmail() {
    return email;
  }

  public Long getId() {
    return id;
  }

  public String getPassword() {
    return password;
  }

  public List<UserRoleEntity> getRoles() {
    return roles;
  }


  public void setActive(Boolean active) {
    this.active = active;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setRoles(List<UserRoleEntity> roles) {
    this.roles = roles;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || this.getClass() != o.getClass())
      return false;
    UserEntity user = (UserEntity) o;
    return user.getId().equals(this.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.getId());
  }

}
