package com.app.persistence.repositories;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.GDPREvaluationEntity;

public class GDPREvaluationRepositoryImpl implements GDPREvaluationRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Transactional
  @Override
  public void save(GDPREvaluationEntity e) {
    entityManager.persist(e);
  }

  @Override
  public Optional<GDPREvaluationEntity> findById(Long id) {
    GDPREvaluationEntity evaluationEntity = entityManager.find(GDPREvaluationEntity.class, id);
    return Optional.of(evaluationEntity);
  }

  @Transactional
  @Override
  public void removeById(Long GDPREvaluationEntityId) {
    final String hQuery = "DELETE FROM GDPREvaluationEntity u WHERE u.id=:paramId";
    entityManager
      .createQuery(hQuery)
      .setParameter("paramId", GDPREvaluationEntityId)
      .executeUpdate();
  }

  @Override
  public Long count() {
    final String hQuery = "SELECT COUNT(u.id) FROM GDPREvaluationEntity u";
    Long count = (Long)entityManager.createQuery(hQuery).getSingleResult();

    return count;
  }
  
}
