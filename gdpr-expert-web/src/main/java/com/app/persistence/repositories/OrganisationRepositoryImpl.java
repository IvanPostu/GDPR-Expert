package com.app.persistence.repositories;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.UserEntity;

public class OrganisationRepositoryImpl implements OrganisationRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public List<OrganisationEntity> findByOwnerId(Long userOwnerId) {
    UserEntity u = entityManager.find(UserEntity.class, userOwnerId);
    List<OrganisationEntity> organisations = u.getOrganisations()
      .stream()
      .map(a -> a) 
      .collect(Collectors.toList());

    return organisations;
  }

  @Override
  public Optional<OrganisationEntity> findOrganisationByIdAndOwnerId(Long organisationId, Long userOwnerId) {
    OrganisationEntity organisation = entityManager.find(OrganisationEntity.class, organisationId);
    
    if(organisation.getOwner().getId().equals(userOwnerId)){
      return Optional.of(organisation);
    }

    return Optional.of(null);
  }

  @Transactional
  @Override
  public void deleteById(Long organisationId) {
    OrganisationEntity organisation = entityManager.find(OrganisationEntity.class, organisationId);

    if (organisation != null) {
      entityManager.remove(organisation);
    } else {
      throw new EntityNotFoundException(String.format("OrganisationEntity with id %d not found", organisationId));
    }

  }

  @Transactional
  @Override
  public void save(OrganisationEntity organisationEntity) {
    entityManager.persist(organisationEntity);
  }

  @Override
  public Optional<OrganisationEntity> findById(Long organisationId) {
    OrganisationEntity organisation = entityManager.find(OrganisationEntity.class, organisationId);
    return Optional.of(organisation);
  }

  @Transactional
  @Override
  public void deleteAll() {
    
    Query query = entityManager
      .createQuery(" DELETE FROM OrganisationEntity ");
    
    query.executeUpdate();
  }

}
