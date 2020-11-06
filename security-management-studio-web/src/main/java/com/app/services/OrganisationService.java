package com.app.services;

import java.util.Set;

import com.app.domain.entities.OrganisationEntity;

public interface OrganisationService {

  Set<OrganisationEntity> findOrganisationsByOwnerId(Long userOwnerId);

  void addOrganisation(OrganisationEntity oEntity);
}
