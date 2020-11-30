package com.app.persistence.repositories;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.GDPREvaluationEntity;

public class GDPREvaluationRepositoryImpl implements GDPREvaluationRepository {

  @PersistenceContext
  private EntityManager em;

  @Transactional
  @Override
  public void save(GDPREvaluationEntity e) {
    em.persist(e);
  }

  @Override
  public Optional<GDPREvaluationEntity> findById(Long id) {
    GDPREvaluationEntity evaluationEntity = em.find(GDPREvaluationEntity.class, id);
    return Optional.of(evaluationEntity);
  }
  
}
