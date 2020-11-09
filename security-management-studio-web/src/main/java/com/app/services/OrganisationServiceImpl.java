package com.app.services;

import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.OrganisationLogoEntity;
import com.app.persistence.dao.OrganisationDao;
import com.app.persistence.dao.OrganisationLogoDao;

import org.springframework.beans.factory.annotation.Autowired;

public class OrganisationServiceImpl implements OrganisationService {

  private final OrganisationDao organisationDao;
  private final OrganisationLogoDao organisationLogoDao;

  @Autowired
  public OrganisationServiceImpl(OrganisationDao organisationDao, OrganisationLogoDao organisationLogoDao) {
    this.organisationDao = organisationDao;
    this.organisationLogoDao = organisationLogoDao;
  }

  @Override
  @Transactional
  public void addOrganisation(OrganisationEntity oEntity) {

    organisationDao.addOrganisation(oEntity);
    OrganisationLogoEntity logo = oEntity.getOrganisationLogoEntity();
    if (logo != null) {
      logo.setId(oEntity.getId());
      organisationLogoDao.addOrganisationLogo(logo);
    }
  }

  @Override
  @Transactional
  public Set<OrganisationEntity> findOrganisationsByOwnerId(Long userOwnerId, boolean withLogos) {
    Set<OrganisationEntity> organisations = organisationDao.findOrganisationsByOwnerId(userOwnerId);

    if (withLogos) {
      for (OrganisationEntity o : organisations) {
        o.getOrganisationLogoEntity();
      }
    }

    return organisations;
  }

  @Override
  @Transactional
  public Optional<OrganisationEntity> findOrganisationByIdAndOwnerId(Long organisationId, Long ownerId,
      boolean withLogo) {

    OrganisationEntity daoResult = organisationDao.findOrganisationByIdAndOwnerId(organisationId, ownerId);

    Optional<OrganisationEntity> result = Optional.of(daoResult);

    if (withLogo && daoResult != null) {
      daoResult.getOrganisationLogoEntity();
    }

    return result;
  }
}
