package com.app.persistence.repositories;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.UserRoleEntity;

public class UserRoleRepositoryImpl implements UserRoleRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Transactional
  @Override
  public void save(UserRoleEntity userRoleEntity) {
    entityManager.persist(userRoleEntity);
  }


  @Transactional
  @Override
  public void removeById(Long roleId) {
    entityManager
      .createQuery("DELETE FROM UserRoleEntity r WHERE r.id=:paramId")
      .setParameter("paramId", roleId)
      .executeUpdate();
  }
  
}
