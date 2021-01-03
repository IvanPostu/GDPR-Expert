package com.app.persistence.repositories;

import java.util.Optional;

import com.app.domain.entities.AuthUserEntity;
import org.springframework.data.repository.Repository;

public interface UserRepository extends Repository<AuthUserEntity, Long>   {

  Optional<AuthUserEntity> findByEmail(String email);

  void removeById(Long id);

  void save(AuthUserEntity userEntity);

  Optional<AuthUserEntity> findById(Long id);

  Long count();
}
