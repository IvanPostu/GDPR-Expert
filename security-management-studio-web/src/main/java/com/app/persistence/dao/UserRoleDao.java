package com.app.persistence.dao;

import java.util.List;

import com.app.domain.entities.UserRoleEntity;

public interface UserRoleDao {
  
  void addRole(UserRoleEntity role);

  List<UserRoleEntity> getRolesByUserId(final int userId);

}
