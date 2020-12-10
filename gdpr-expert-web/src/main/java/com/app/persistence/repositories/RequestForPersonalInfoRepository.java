package com.app.persistence.repositories;

import com.app.domain.entities.RequestForPersonalInfoEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

public interface RequestForPersonalInfoRepository extends Repository<RequestForPersonalInfoEntity, Long> {


  void save(RequestForPersonalInfoEntity requestForPersonalInfoEntity);

  RequestForPersonalInfoEntity getRequestForPersonalInfoById(Long requestForPersonalInfoId);

  Page<RequestForPersonalInfoEntity> getAllRequestsForUserOrganisations(Long userId, Pageable pageable);

}
