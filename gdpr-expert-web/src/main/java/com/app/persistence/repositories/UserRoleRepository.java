package com.app.persistence.repositories;

import com.app.domain.entities.UserRoleEntity;
import org.springframework.data.repository.Repository;

public interface UserRoleRepository extends Repository<UserRoleEntity, Long> {
  
  void save(UserRoleEntity userRoleEntity);

  void removeById(Long roleId);

}
