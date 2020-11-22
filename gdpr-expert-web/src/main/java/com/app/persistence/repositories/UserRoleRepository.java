package com.app.persistence.repositories;

import com.app.domain.entities.UserRoleEntity;

import org.springframework.data.repository.CrudRepository;

public interface UserRoleRepository extends CrudRepository<UserRoleEntity, Long> {
  
}
