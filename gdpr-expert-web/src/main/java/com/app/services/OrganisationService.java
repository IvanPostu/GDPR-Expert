package com.app.services;

import java.text.ParseException;
import java.util.Optional;
import java.util.Set;

import com.app.domain.dto.UpdateOrganisationDto;
import com.app.domain.entities.OrganisationEntity;

public interface OrganisationService {

  Set<OrganisationEntity> findOrganisationsByOwnerId(Long userOwnerId, boolean withLogos);

  Optional<OrganisationEntity> findOrganisationByIdAndOwnerId(
    Long organisationId, Long ownerId, boolean withLogo
  );

  void addOrganisation(OrganisationEntity oEntity);

  void updateOrganisation(UpdateOrganisationDto updateOrganisationDto, Long ownerId) throws ParseException;

  boolean deleteById(Long organisationId, Long ownerId);
}
