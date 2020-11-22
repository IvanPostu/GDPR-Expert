package com.app.services;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import com.app.domain.dto.UpdateOrganisationDto;
import com.app.domain.entities.OrganisationEntity;

public interface OrganisationService {

  List<OrganisationEntity> findOrganisationsByOwnerId(Long userOwnerId, boolean withLogos);

  Optional<OrganisationEntity> findOrganisationByIdAndOwnerId(
    Long organisationId, Long ownerId, boolean withLogo
  );

  void addOrganisation(OrganisationEntity oEntity);

  void updateOrganisation(UpdateOrganisationDto updateOrganisationDto, Long ownerId) throws ParseException;

  boolean deleteById(Long organisationId, Long ownerId);
}
