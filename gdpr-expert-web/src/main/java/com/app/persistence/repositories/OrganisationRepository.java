package com.app.persistence.repositories;

import java.util.List;
import java.util.Optional;

import com.app.domain.entities.OrganisationEntity;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface OrganisationRepository extends CrudRepository<OrganisationEntity, Long>{
  
  @Query("FROM OrganisationEntity WHERE user_owner_id=:ownerId")
  List<OrganisationEntity> findByOwnerId(@Param("ownerId") Long userOwnerId); 

  @Query("FROM OrganisationEntity WHERE user_owner_id=:ownerId AND organisation_id=:orgId")
  Optional<OrganisationEntity> findOrganisationByIdAndOwnerId(@Param("orgId") Long organisationId,@Param("ownerId") Long userOwnerId );

  @Modifying
  @Query("DELETE FROM OrganisationEntity WHERE organisation_id=:id")
  void deleteById(@Param("id") Long orgId);
}
