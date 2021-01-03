package com.app.persistence.repositories;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.AuthUserRoleEntity;

public class UserRoleRepositoryImpl implements UserRoleRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Transactional
  @Override
  public void save(AuthUserRoleEntity userRoleEntity) {
    entityManager.persist(userRoleEntity);
  }


  @Transactional
  @Override
  public void removeById(Long roleId) {
    entityManager
      .createQuery("DELETE FROM AuthUserRoleEntity r WHERE r.id=:paramId")
      .setParameter("paramId", roleId)
      .executeUpdate();
  }
  
}
