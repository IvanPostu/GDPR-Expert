package com.app.domain.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user", schema = "app")
public class UserEntity implements UserDetails {

  private static final long serialVersionUID = 3167844333375708893L;

  @Setter
  @Getter
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id", unique = true)
  private Long id;

  @Setter
  @Getter()
  @Column(name = "active")
  private boolean active;

  @Setter
  @Getter
  @Column(name = "email")
  private String email;

  @Setter
  @Getter
  @Column(name = "password")
  private String password;

  @Setter
  @Getter
  @OneToMany(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  private List<UserRoleEntity> roles = new ArrayList<>();

  @Setter
  @Getter
  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_owner_id")
  private Set<OrganisationEntity> organisations = new HashSet<>();

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

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return roles;
  }

  @Override
  public String getUsername() {
    return getEmail();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return isActive();
  }

  public static UserRoleEntity userRole(){
    UserRoleEntity role = new UserRoleEntity();
    role.setName("USER");
    return role;
  } 

  public static UserRoleEntity moderatorRole(){
    UserRoleEntity role = new UserRoleEntity();
    role.setName("MODERATOR");
    return role;
  } 

  public static UserRoleEntity adminRole(){
    UserRoleEntity role = new UserRoleEntity();
    role.setName("ADMIN");
    return role;
  } 

}
