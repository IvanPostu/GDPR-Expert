package com.app.persistence.repositories;

import java.util.List;
import java.util.Optional;

import com.app.domain.entities.OrganisationEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

public interface OrganisationRepository extends Repository<OrganisationEntity, Long>{
  
  List<OrganisationEntity> findByOwnerId(@Param("ownerId") Long userOwnerId); 

  Optional<OrganisationEntity> findOrganisationByIdAndOwnerId(@Param("orgId") Long organisationId,@Param("ownerId") Long userOwnerId );

  void deleteById(@Param("id") Long organisationId);

  void save(OrganisationEntity organisationEntity);

  Optional<OrganisationEntity> findById(Long organisationId);

  void deleteAll();

  Page<OrganisationEntity> findAll(Pageable pageable);
}
