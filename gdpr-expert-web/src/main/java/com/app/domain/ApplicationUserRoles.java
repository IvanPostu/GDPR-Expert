package com.app.domain;

import com.app.domain.entities.UserRoleEntity;

public class ApplicationUserRoles {
  
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
