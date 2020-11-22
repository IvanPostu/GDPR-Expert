package com.app.persistence.repositories;

import java.util.Optional;

import com.app.domain.entities.UserEntity;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<UserEntity, Long>   {

  @Query("FROM UserEntity u WHERE u.email=:paramEmail")
  Optional<UserEntity> findByEmail(@Param("paramEmail") String email);
  
}
