package com.app.persistence.dao;

import java.util.Set;

import com.app.domain.entities.OrganisationEntity;

public interface OrganisationDao {
  
  Set<OrganisationEntity> findOrganisationsByOwnerId(Long userOwnerId);

  OrganisationEntity findOrganisationByIdAndOwnerId(Long organisationId, Long ownerId);

  void addOrganisation(OrganisationEntity oEntity);

}
