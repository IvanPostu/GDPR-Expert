package com.app.services;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.app.domain.dto.GDPRRequestFromThePersonDto;
import com.app.domain.dto.PersonalInfoRequestFromPeopleResponseDto;
import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.RequestForPersonalInfoEntity;
import com.app.persistence.repositories.RequestForPersonalInfoRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

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

  @Transactional
  @Override
  public Page<PersonalInfoRequestFromPeopleResponseDto> getAllRequestsForUserOrganisations(Long userId, Pageable p) {
    
    Page<RequestForPersonalInfoEntity> pageFromDb =  requestForPersonalInfoRepository.getAllRequestsForUserOrganisations(userId, p);

    List<PersonalInfoRequestFromPeopleResponseDto> resultArr = pageFromDb.getContent()
      .stream()
      .map(a -> PersonalInfoRequestFromPeopleResponseDto
        .builder()
        .comment(a.getComment())
        .email(a.getPersonEmail())
        .firstName(a.getPersonFirstname())
        .lastName(a.getPersonLastname())
        .personalInfoRequestId(a.getId())
        .phone(a.getPersonPhoneNumber())
        .requestedRight(a.getRequestedRight())
        .requestedAt(a.getRequestedAt())
        .organisationId(a.getOrganisation().getId())
        .organisationName(a.getOrganisation().getName())
        .processed(a.isProcessed())
        .build())
      .collect(Collectors.toList());

    PageImpl <PersonalInfoRequestFromPeopleResponseDto> resultPage = new PageImpl<>(
      resultArr, pageFromDb.getPageable(), pageFromDb.getTotalElements()
    );

    return resultPage;
  }

  @Transactional
  @Override
  public PersonalInfoRequestFromPeopleResponseDto getRequestById(Long requestForPersonalInfoId) {
    
    RequestForPersonalInfoEntity requestForPersonalInfoEntity = requestForPersonalInfoRepository
      .getRequestForPersonalInfoById(requestForPersonalInfoId);

    PersonalInfoRequestFromPeopleResponseDto r = PersonalInfoRequestFromPeopleResponseDto
      .builder()
      .comment(requestForPersonalInfoEntity.getComment())
      .email(requestForPersonalInfoEntity.getPersonEmail())
      .firstName(requestForPersonalInfoEntity.getPersonFirstname())
      .lastName(requestForPersonalInfoEntity.getPersonLastname())
      .personalInfoRequestId(requestForPersonalInfoEntity.getId())
      .phone(requestForPersonalInfoEntity.getPersonPhoneNumber())
      .requestedRight(requestForPersonalInfoEntity.getRequestedRight())
      .requestedAt(requestForPersonalInfoEntity.getRequestedAt())
      .organisationId(requestForPersonalInfoEntity.getOrganisation().getId())
      .organisationName(requestForPersonalInfoEntity.getOrganisation().getName())
      .processed(requestForPersonalInfoEntity.isProcessed())
      .build();

    return r;
  }

}
