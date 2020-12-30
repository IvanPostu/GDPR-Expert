package com.app.persistence.repositories;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import com.app.domain.entities.UserEntity;

public class UserRepositoryImpl implements UserRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public Optional<UserEntity> findByEmail(String email) {

    final String hQuery = "FROM UserEntity u WHERE u.email=:paramEmail";

    TypedQuery<UserEntity> typedQuery = entityManager
      .createQuery(hQuery, UserEntity.class)
      .setParameter("paramEmail", email);

    Optional<UserEntity> userEOptional = Optional.ofNullable(typedQuery.getSingleResult());
    return userEOptional;
  }

  @Transactional
  @Override
  public void save(UserEntity userEntity) {
    entityManager.persist(userEntity);
  }

  @Override
  public Optional<UserEntity> findById(Long id) {
    UserEntity userEntity = entityManager.find(UserEntity.class, id);
    return Optional.of(userEntity);
  }

  @Transactional
  @Override
  public void removeById(Long id) {
    final String hQuery = "DELETE FROM UserEntity u WHERE u.id=:paramId";
    entityManager.createQuery(hQuery).setParameter("paramId", id).executeUpdate();
  }


  @Override
  public Long count() {
    final String hQuery = "SELECT COUNT(u.id) FROM UserEntity u";
    Long count = (Long)entityManager.createQuery(hQuery).getSingleResult();

    return count;
  }

}
