package com.app.services;

import com.app.domain.dto.GDPRRequestFromThePersonDto;

public interface RequestForPersonalInfoService {
  
  void addRequestForPersonalInfo(GDPRRequestFromThePersonDto requestForPersonalInfoDto);

}
