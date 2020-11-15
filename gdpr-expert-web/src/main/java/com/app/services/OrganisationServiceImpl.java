package com.app.services;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import com.app.beans.ApplicationDateFormatter;
import com.app.domain.dto.UpdateOrganisationDto;
import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.OrganisationLogoEntity;
import com.app.persistence.dao.OrganisationDao;
import com.app.persistence.dao.OrganisationLogoDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

public class OrganisationServiceImpl implements OrganisationService {

  private final OrganisationDao organisationDao;
  private final OrganisationLogoDao organisationLogoDao;
  private final ApplicationDateFormatter dateFormatter;

  @Autowired
  public OrganisationServiceImpl(OrganisationDao organisationDao, OrganisationLogoDao organisationLogoDao,
      ApplicationDateFormatter dateFormatter) {
    this.organisationDao = organisationDao;
    this.organisationLogoDao = organisationLogoDao;
    this.dateFormatter = dateFormatter;
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

  @Override
  @Transactional
  public boolean deleteById(Long organisationId, Long ownerId) {
    OrganisationEntity daoResult = organisationDao.findOrganisationByIdAndOwnerId(organisationId, ownerId);

    return organisationDao.removeOrganisation(daoResult.getId());
  }

  @Override
  @Transactional
  public void updateOrganisation(UpdateOrganisationDto updateOrganisationDto, Long ownerId) throws ParseException {
    OrganisationEntity organisationFromDb = organisationDao
      .findOrganisationByIdAndOwnerId(updateOrganisationDto.getId(), ownerId);

    organisationFromDb.setAddress(updateOrganisationDto.getAddress());
    organisationFromDb.setAdministrator(updateOrganisationDto.getLegalRepresentative());
    organisationFromDb.setCreatedOnPlatformAt(LocalDateTime.now());
    organisationFromDb.setFoundedAt(dateFormatter.format(updateOrganisationDto.getFoundedAt()));
    organisationFromDb.setEmail(updateOrganisationDto.getEmail());
    organisationFromDb.setLegalForm(updateOrganisationDto.getLegalForm());
    organisationFromDb.setName(updateOrganisationDto.getOrganisationName());
    organisationFromDb.setPhoneNumber(updateOrganisationDto.getTelephone());
    organisationFromDb.setDescription(updateOrganisationDto.getDescription());

    if (!StringUtils.isEmpty(updateOrganisationDto.getBase64LogoImage())) {
      OrganisationLogoEntity logoEntity = organisationFromDb.getOrganisationLogoEntity();

      if(logoEntity == null){
        logoEntity = new OrganisationLogoEntity();
      }

      logoEntity.setId(updateOrganisationDto.getId());
      logoEntity.setImageData(updateOrganisationDto.getBase64LogoImage().getBytes());
      organisationLogoDao.addOrganisationLogo(logoEntity);
    }
    
    organisationDao.addOrganisation(organisationFromDb);
  }
}