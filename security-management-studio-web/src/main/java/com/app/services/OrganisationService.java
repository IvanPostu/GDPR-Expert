package com.app.services;

import java.util.Set;

import com.app.domain.entities.OrganisationEntity;

public interface OrganisationService {

  Set<OrganisationEntity> findOrganisationsByOwnerId(Long userOwnerId, boolean withLogos);

  void addOrganisation(OrganisationEntity oEntity);
}
