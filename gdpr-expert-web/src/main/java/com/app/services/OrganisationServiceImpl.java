package com.app.services;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.app.beans.ApplicationDateFormatter;
import com.app.domain.dto.UpdateOrganisationDto;
import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.OrganisationLogoEntity;
import com.app.persistence.repositories.OrganisationRepository;
import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class OrganisationServiceImpl implements OrganisationService {

  private final OrganisationRepository organisationRepository;
  private final ApplicationDateFormatter dateFormatter;

  @Autowired
  public OrganisationServiceImpl(
    OrganisationRepository organisationRepository,
    ApplicationDateFormatter dateFormatter) 
  {
    this.organisationRepository = organisationRepository;
    this.dateFormatter = dateFormatter;
  }

  @Override
  public void addOrganisation(OrganisationEntity oEntity) {
    organisationRepository.save(oEntity);
  }

  @Transactional
  @Override
  public List<OrganisationEntity> findOrganisationsByOwnerId(Long userOwnerId, boolean withLogos) {
    List<OrganisationEntity> organisations = organisationRepository.findAllByOwnerId(userOwnerId);

    if (withLogos) {
      for (OrganisationEntity o : organisations) {
        o.getOrganisationLogoEntity();
      }
    }

    return organisations;
  }

  @Transactional
  @Override
  public Optional<OrganisationEntity> findOrganisationByIdAndOwnerId(Long organisationId, Long ownerId,
      boolean withLogo) {

    Optional<OrganisationEntity> organisationEntity = organisationRepository
        .findOrganisationByIdAndOwnerId(organisationId, ownerId);

    return organisationEntity;
  }

  @Override
  public boolean deleteById(Long organisationId, Long ownerId) {
    OrganisationEntity organisationEntity = organisationRepository.findById(organisationId).get();

    final Long ownerIdFromDb = organisationEntity.getOwner().getId();

    if (ownerIdFromDb.equals(ownerId)) {
      // organisationLogoRepository.deleteById(organisationId);
      organisationRepository.deleteById(organisationId);
      return true;
    }

    return false;
  }

  @Override
  @Transactional
  public void updateOrganisation(UpdateOrganisationDto updateOrganisationDto, Long ownerId) throws ParseException {
    OrganisationEntity organisationFromDb = organisationRepository
        .findOrganisationByIdAndOwnerId(updateOrganisationDto.getId(), ownerId)
        .orElseThrow(() -> new RuntimeException());

    organisationFromDb.setAddress(updateOrganisationDto.getAddress());
    organisationFromDb.setAdministrator(updateOrganisationDto.getLegalRepresentative());
    organisationFromDb.setCreatedOnPlatformAt(LocalDateTime.now());
    organisationFromDb.setFoundedAt(dateFormatter.format(updateOrganisationDto.getFoundedAt()));
    organisationFromDb.setEmail(updateOrganisationDto.getEmail());
    organisationFromDb.setLegalForm(updateOrganisationDto.getLegalForm());
    organisationFromDb.setName(updateOrganisationDto.getOrganisationName());
    organisationFromDb.setPhoneNumber(updateOrganisationDto.getTelephone());
    organisationFromDb.setDescription(updateOrganisationDto.getDescription());

    OrganisationLogoEntity logoEntity = organisationFromDb.getOrganisationLogoEntity();

    logoEntity.setId(updateOrganisationDto.getId());
    if (!"".equals(updateOrganisationDto.getBase64LogoImage())) {
      logoEntity.setImageData(updateOrganisationDto.getBase64LogoImage().getBytes());
    }
    organisationFromDb.setOrganisationLogoEntity(logoEntity);

    organisationRepository.save(organisationFromDb);
  }

  @Transactional
  @Override
  public Page<Pair<Long, String>> getOrganisationNames(Pageable pageable) {
    Page<OrganisationEntity> organisationsPage = organisationRepository
      .findAll(pageable);
    
    List<Pair<Long, String>> organisationNames = organisationsPage
      .getContent()
      .stream()
      .map(a -> Pair.with(a.getId(), a.getName()))
      .collect(Collectors.toList());

    PageImpl<Pair<Long, String>> result = new PageImpl<Pair<Long, String>>(
      organisationNames, organisationsPage.getPageable(), organisationsPage.getTotalElements());

    return result;
  }

  
}