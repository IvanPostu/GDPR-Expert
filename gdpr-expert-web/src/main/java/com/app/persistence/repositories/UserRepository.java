package com.app.persistence.repositories;

import java.util.Optional;

import com.app.domain.entities.UserEntity;

import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends Repository<UserEntity, Long>   {

  // @Query("FROM UserEntity u WHERE u.email=:paramEmail")
  // Optional<UserEntity> findByEmail(@Param("paramEmail") String email);
  Optional<UserEntity> findByEmail(@Param("paramEmail") String email);

  void deleteAll();

  void save(UserEntity userEntity);

  Optional<UserEntity> findById(Long id);
}
