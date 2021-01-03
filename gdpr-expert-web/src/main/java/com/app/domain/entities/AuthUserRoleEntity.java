package com.app.domain.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name="auth_user_role", schema = "app")
public class AuthUserRoleEntity implements GrantedAuthority {

  private static final long serialVersionUID = 3857804786772325341L;

  @Id
  @Column(name="auth_user_id", unique = true)
  private Long id;
  
  @Column(name = "role_name")
  private String name;

  public void setId(Long id) {
    this.id = id;
    
  }

  public Long getId() {
    return id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  @JsonIgnore
  @Override
  public String getAuthority() {
    return "ROLE_" + getName();
  }
  
}