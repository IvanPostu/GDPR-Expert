package com.app.services;

import java.util.Optional;
import java.util.Set;

import com.app.domain.entities.OrganisationEntity;

public interface OrganisationService {

  Set<OrganisationEntity> findOrganisationsByOwnerId(Long userOwnerId, boolean withLogos);

  Optional<OrganisationEntity> findOrganisationByIdAndOwnerId(
    Long organisationId, Long ownerId, boolean withLogo
  );

  void addOrganisation(OrganisationEntity oEntity);

  boolean deleteById(Long organisationId, Long ownerId);
}
