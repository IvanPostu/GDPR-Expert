package com.app.services;

import com.app.domain.dto.GDPRRequestFromThePersonDto;
import com.app.domain.dto.PersonalInfoRequestFromPeopleResponseDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RequestForPersonalInfoService {
  
  void addRequestForPersonalInfo(GDPRRequestFromThePersonDto requestForPersonalInfoDto);

  Page<PersonalInfoRequestFromPeopleResponseDto> getAllRequestsForUserOrganisations(Long userId, Pageable p);
}
