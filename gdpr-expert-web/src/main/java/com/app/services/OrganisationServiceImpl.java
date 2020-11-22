package com.app.services;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.app.beans.ApplicationDateFormatter;
import com.app.domain.dto.UpdateOrganisationDto;
import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.OrganisationLogoEntity;
import com.app.persistence.repositories.OrganisationLogoRepository;
import com.app.persistence.repositories.OrganisationRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class OrganisationServiceImpl implements OrganisationService {

  private final OrganisationRepository organisationRepository;
  private final OrganisationLogoRepository organisationLogoRepository ;
  private final ApplicationDateFormatter dateFormatter;

  @Autowired
  public OrganisationServiceImpl(OrganisationRepository organisationRepository, OrganisationLogoRepository organisationLogoRepository, ApplicationDateFormatter dateFormatter) {
        
    this.organisationRepository = organisationRepository;
    this.organisationLogoRepository = organisationLogoRepository;
    this.dateFormatter = dateFormatter;
  }

  @Transactional
  @Override
  public void addOrganisation(OrganisationEntity oEntity) {

    OrganisationLogoEntity logo = oEntity.getOrganisationLogoEntity();
    oEntity.setOrganisationLogoEntity(null);
    oEntity = organisationRepository.save(oEntity);
    logo.setId(oEntity.getId());
    organisationLogoRepository.save(logo);
  }

  @Transactional
  @Override
  public List<OrganisationEntity> findOrganisationsByOwnerId(Long userOwnerId, boolean withLogos) {
    List<OrganisationEntity> organisations = organisationRepository.findByOwnerId(userOwnerId);

    if (withLogos) {
      for (OrganisationEntity o : organisations) {
        o.getOrganisationLogoEntity();
      }
    }

    return organisations;
  }

  @Transactional
  @Override
  public Optional<OrganisationEntity> findOrganisationByIdAndOwnerId(Long organisationId, 
    Long ownerId, boolean withLogo) {

    Optional<OrganisationEntity> organisationEntity = organisationRepository
      .findOrganisationByIdAndOwnerId(organisationId, ownerId);

    return organisationEntity;
  }

  @Override
  @Transactional
  public boolean deleteById(Long organisationId, Long ownerId) {
    OrganisationEntity organisationEntity = organisationRepository
      .findById(organisationId)
      .get();

    final Long ownerIdFromDb = organisationEntity.getOwner().getId();

    if(ownerIdFromDb.equals(ownerId)){
      organisationLogoRepository.deleteById(organisationId);
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
    if(!"".equals(updateOrganisationDto.getBase64LogoImage())){
      logoEntity.setImageData(updateOrganisationDto.getBase64LogoImage().getBytes());
    }
    organisationFromDb.setOrganisationLogoEntity(logoEntity);
    
    organisationRepository.save(organisationFromDb);
  }
}