package com.app.rest;

import com.app.domain.dto.PersonalInfoRequestFromPeopleResponseDto;
import com.app.domain.entities.UserEntity;
import com.app.services.RequestForPersonalInfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/personalDataRequests")
public class PersonalInfoRequestRestController {

  @Autowired
  private RequestForPersonalInfoService requestForPersonalInfoService;

  @RequestMapping(value = "/list", method = RequestMethod.GET)
  public ResponseEntity<?> personalInfoRequests(@AuthenticationPrincipal UserEntity user,
      @RequestParam(value = "page", defaultValue = "0") int pageIndex) {

    final int pageSize = 5;
    PageRequest pRequest = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, "id"));
    Page<PersonalInfoRequestFromPeopleResponseDto> page = requestForPersonalInfoService
      .getAllRequestsForUserOrganisations(user.getId(), pRequest);

    return ResponseEntity.ok(page);
  }

  @RequestMapping(value = "/{personalInfoRequestId}", method = RequestMethod.GET)
  public ResponseEntity<?> personalInfoRequestInfo(@AuthenticationPrincipal UserEntity user,
      @PathVariable(value = "personalInfoRequestId", required = true) Long personalInfoRequestId) {

    PersonalInfoRequestFromPeopleResponseDto result =   requestForPersonalInfoService
      .getRequestById(personalInfoRequestId);
    
    return ResponseEntity.ok(result);
  }
}
