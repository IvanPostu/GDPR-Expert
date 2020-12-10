package com.app.persistence.repositories;

import java.util.List;

import com.app.domain.entities.RequestForPersonalInfoEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

public interface RequestForPersonalInfoRepository extends Repository<RequestForPersonalInfoEntity, Long> {


  void save(RequestForPersonalInfoEntity requestForPersonalInfoEntity);

  List<RequestForPersonalInfoEntity> getRequestsForPersonalInfoForOrganisation(Long organisationId);

  Page<RequestForPersonalInfoEntity> getAllRequestsForUserOrganisations(Long userId, Pageable pageable);

}
