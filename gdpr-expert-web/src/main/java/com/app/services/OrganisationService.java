package com.app.services;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import com.app.domain.dto.UpdateOrganisationDto;
import com.app.domain.entities.OrganisationEntity;

import org.javatuples.Pair;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrganisationService {

  List<OrganisationEntity> findOrganisationsByOwnerId(Long userOwnerId, boolean withLogos);

  Optional<OrganisationEntity> findOrganisationByIdAndOwnerId(
    Long organisationId, Long ownerId, boolean withLogo
  );

  void addOrganisation(OrganisationEntity oEntity);

  /**
     * <p>
     * First pai elelent: organisationId, second: organisationName
     * </p>
     */
  Page<Pair<Long, String>> getOrganisationNames(Pageable pageable);

  void updateOrganisation(UpdateOrganisationDto updateOrganisationDto, Long ownerId) 
    throws ParseException;

  boolean deleteById(Long organisationId, Long ownerId);
}
