package com.app.persistence.repositories;

import java.util.List;

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

  @Override
  public List<DataProcessingActivityEntity> getDataProcessingActivities(Long userId, Long organisationId) {

    final String hibernateQuery = "SELECT pa FROM DataProcessingActivityEntity pa "
        + "INNER JOIN OrganisationEntity o ON o.id=pa.organisation.id " 
        + "WHERE pa.organisation.owner.id=:userId AND pa.organisation.id=:organisation_id "
        + "ORDER BY pa.id DESC";

    List<DataProcessingActivityEntity> activities = em
      .createQuery(hibernateQuery, DataProcessingActivityEntity.class)
      .setParameter("userId", userId)
      .setParameter("organisation_id", organisationId)
      .getResultList();

    return activities;
  }

}
