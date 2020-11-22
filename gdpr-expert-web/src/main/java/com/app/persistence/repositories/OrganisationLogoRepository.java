package com.app.persistence.repositories;

import com.app.domain.entities.OrganisationLogoEntity;

import org.springframework.data.repository.CrudRepository;

public interface OrganisationLogoRepository extends CrudRepository<OrganisationLogoEntity, Long> {
  
}
