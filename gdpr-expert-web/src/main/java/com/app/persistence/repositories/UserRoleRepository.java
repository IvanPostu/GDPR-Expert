package com.app.persistence.repositories;

import com.app.domain.entities.AuthUserRoleEntity;
import org.springframework.data.repository.Repository;

public interface UserRoleRepository extends Repository<AuthUserRoleEntity, Long> {
  
  void save(AuthUserRoleEntity userRoleEntity);

  void removeById(Long roleId);

}
