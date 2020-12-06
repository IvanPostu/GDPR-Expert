package com.app.persistence.repositories;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.DataProcessingActivityEntity;

import org.springframework.stereotype.Repository;

@Repository
public class DataProcessingActivityRepositoryImpl implements DataProcessingActivityRepository {

  @PersistenceContext
  private EntityManager em;

  @Transactional
  @Override
  public void save(DataProcessingActivityEntity dataProcessingActivityEntity) {
    em.persist(dataProcessingActivityEntity);
  }
  
}
