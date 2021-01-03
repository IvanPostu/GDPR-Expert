package com.app.persistence.repositories;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import com.app.domain.entities.AuthUserEntity;
import com.app.domain.entities.AuthUserPersonalInfoEntity;

public class UserRepositoryImpl implements UserRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public Optional<AuthUserEntity> findByEmail(String email) {

    final String hQuery = "FROM AuthUserEntity u WHERE u.email=:paramEmail";

    TypedQuery<AuthUserEntity> typedQuery = entityManager
      .createQuery(hQuery, AuthUserEntity.class)
      .setParameter("paramEmail", email);

    Optional<AuthUserEntity> userEOptional = Optional.ofNullable(typedQuery.getSingleResult());
    return userEOptional;
  }

  @Transactional
  @Override
  public void save(AuthUserEntity userEntity) {
    entityManager.persist(userEntity);

    AuthUserPersonalInfoEntity personalInfoEntity = userEntity.getPersonalInfoEntity();
    if(personalInfoEntity == null){
      personalInfoEntity = new AuthUserPersonalInfoEntity();
      userEntity.setPersonalInfoEntity(personalInfoEntity);
    }

    personalInfoEntity.setAuthUserEntity(userEntity);
    personalInfoEntity.setId(userEntity.getId());

    entityManager.persist(personalInfoEntity);
  }

  @Override
  public Optional<AuthUserEntity> findById(Long id) {
    AuthUserEntity userEntity = entityManager.find(AuthUserEntity.class, id);
    return Optional.of(userEntity);
  }

  @Transactional
  @Override
  public void removeById(Long id) {
    final String hQuery = "DELETE FROM AuthUserEntity u WHERE u.id=:paramId";
    entityManager.createQuery(hQuery).setParameter("paramId", id).executeUpdate();
  }


  @Override
  public Long count() {
    final String hQuery = "SELECT COUNT(u.id) FROM AuthUserEntity u";
    Long count = (Long)entityManager.createQuery(hQuery).getSingleResult();

    return count;
  }

}
