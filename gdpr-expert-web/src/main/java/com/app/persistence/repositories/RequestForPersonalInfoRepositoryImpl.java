package com.app.persistence.repositories;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.RequestForPersonalInfoEntity;

public class RequestForPersonalInfoRepositoryImpl implements RequestForPersonalInfoRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Transactional
  @Override
  public void save(RequestForPersonalInfoEntity requestForPersonalInfoEntity) {
    entityManager.persist(requestForPersonalInfoEntity);
  }

  @Override
  public List<RequestForPersonalInfoEntity> getRequestsForPersonalInfoForOrganisation(Long organisationId) {
    // TODO Auto-generated method stub
    return null;
  }
  
}
