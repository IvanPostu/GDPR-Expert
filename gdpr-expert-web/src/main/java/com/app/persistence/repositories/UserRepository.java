package com.app.persistence.repositories;

import java.util.Optional;

import com.app.domain.entities.UserEntity;
import org.springframework.data.repository.Repository;

public interface UserRepository extends Repository<UserEntity, Long>   {

  Optional<UserEntity> findByEmail(String email);

  void removeById(Long id);

  void save(UserEntity userEntity);

  Optional<UserEntity> findById(Long id);

  Long count();
}
