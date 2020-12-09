package com.app.services;

import java.util.Date;

import com.app.domain.dto.GDPRRequestFromThePersonDto;
import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.RequestForPersonalInfoEntity;
import com.app.persistence.repositories.RequestForPersonalInfoRepository;

public class RequestForPersonalInfoServiceImpl implements RequestForPersonalInfoService {

  private final RequestForPersonalInfoRepository requestForPersonalInfoRepository;

  public RequestForPersonalInfoServiceImpl(RequestForPersonalInfoRepository requestForPersonalInfoRepository) {
    this.requestForPersonalInfoRepository = requestForPersonalInfoRepository;
  }
  
  @Override
  public void addRequestForPersonalInfo(GDPRRequestFromThePersonDto requestForPersonalInfoDto) {

    RequestForPersonalInfoEntity requestForPersonalInfo = new RequestForPersonalInfoEntity();
    requestForPersonalInfo.setComment(requestForPersonalInfoDto.getComment());
    requestForPersonalInfo.setPersonEmail(requestForPersonalInfoDto.getEmail());
    requestForPersonalInfo.setPersonFirstname(requestForPersonalInfoDto.getFirstName());
    requestForPersonalInfo.setPersonLastname(requestForPersonalInfoDto.getLastName());
    requestForPersonalInfo.setPersonPhoneNumber(requestForPersonalInfoDto.getPhone());
    requestForPersonalInfo.setProcessed(false);
    requestForPersonalInfo.setRequestedAt(new Date());
    requestForPersonalInfo.setRequestedRight(requestForPersonalInfoDto.getRequestedRight());

    OrganisationEntity org = new OrganisationEntity();
    org.setId(requestForPersonalInfoDto.getOrganisationId());

    requestForPersonalInfo.setOrganisation(org);

    requestForPersonalInfoRepository.save(requestForPersonalInfo);
  }

}
