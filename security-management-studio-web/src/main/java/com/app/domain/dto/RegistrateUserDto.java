package com.app.domain.dto;

public class RegistrateUserDto {
  
  private String email;

  private String password;

  public void setEmail(String email) {
    this.email = email;
  }

  public String getEmail() {
    return email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getPassword() {
    return password;
  }

}
