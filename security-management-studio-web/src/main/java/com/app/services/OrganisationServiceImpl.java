package com.app.services;

import javax.transaction.Transactional;

import com.app.domain.entities.OrganisationEntity;
import com.app.persistence.dao.OrganisationDao;

import org.springframework.beans.factory.annotation.Autowired;

public class OrganisationServiceImpl implements OrganisationService {

  private final OrganisationDao organisationDao;

  @Autowired
  public OrganisationServiceImpl (OrganisationDao organisationDao){
    this.organisationDao = organisationDao;
  }

  @Override
  @Transactional
  public void addOrganisation(OrganisationEntity oEntity) {
    organisationDao.addOrganisation(oEntity);
  }
  
}
