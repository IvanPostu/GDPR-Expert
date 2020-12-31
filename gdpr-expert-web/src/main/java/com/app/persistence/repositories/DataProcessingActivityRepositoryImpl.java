package com.app.persistence.repositories;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.DataProcessingActivityEntity;


public class DataProcessingActivityRepositoryImpl implements DataProcessingActivityRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Transactional
  @Override
  public void save(DataProcessingActivityEntity dataProcessingActivityEntity) {
    entityManager.persist(dataProcessingActivityEntity);
  }

  @Override
  public List<DataProcessingActivityEntity> getDataProcessingActivitiesForOrganisation(Long userId, Long organisationId) {

    final String hibernateQuery = "SELECT pa FROM DataProcessingActivityEntity pa "
        + "INNER JOIN OrganisationEntity o ON o.id=pa.organisation.id "
        + "WHERE pa.organisation.owner.id=:userId AND pa.organisation.id=:organisation_id " + "ORDER BY pa.id DESC";

    List<DataProcessingActivityEntity> activities = entityManager.createQuery(hibernateQuery, DataProcessingActivityEntity.class)
        .setParameter("userId", userId).setParameter("organisation_id", organisationId).getResultList();

    return activities;
  }

  @Override
  public DataProcessingActivityEntity getDataProcessingActivityById(Long dataProcessingActivityId) {

    DataProcessingActivityEntity activity = entityManager
      .find(DataProcessingActivityEntity.class, dataProcessingActivityId);

    return activity;
  }

  @Override
  public List<DataProcessingActivityEntity> getDataProcessingActivitiesForDepartment(Long userId, Long departmentId) {
    final String hibernateQuery = "SELECT pa FROM DataProcessingActivityEntity pa "
      + "INNER JOIN OrganisationEntity o ON o.id=pa.organisation.id "
      + "INNER JOIN DepartmentEntity d ON d.id=pa.department.id "
      + "WHERE pa.organisation.owner.id=:userId AND pa.department.id=:department_id " 
      + "ORDER BY pa.id DESC";

    List<DataProcessingActivityEntity> activities = entityManager
      .createQuery(hibernateQuery, DataProcessingActivityEntity.class)
      .setParameter("userId", userId)
      .setParameter("department_id", departmentId)
      .getResultList();

    return activities;
  }

  @Transactional
  @Override
  public void removeById(Long dataProcessingActivityId) {
    final String hQuery = "DELETE FROM DataProcessingActivityEntity a WHERE a.id=:paramId";
    entityManager
      .createQuery(hQuery)
      .setParameter("paramId", dataProcessingActivityId)
      .executeUpdate();
  }

  @Override
  public Long count() {
    final String hQuery = "SELECT COUNT(d.id) FROM DataProcessingActivityEntity d";
    Long count = (Long)entityManager.createQuery(hQuery).getSingleResult();

    return count;
  }

}
