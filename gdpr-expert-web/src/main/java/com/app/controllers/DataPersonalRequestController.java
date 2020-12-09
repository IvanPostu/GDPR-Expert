package com.app.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.app.domain.dto.GDPRRequestFromThePersonDto;
import com.app.services.OrganisationService;
import com.app.services.RequestForPersonalInfoService;

import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class DataPersonalRequestController {

  @Autowired
  private OrganisationService organisationService;

  @Autowired
  private RequestForPersonalInfoService requestForPersonalInfoService;

  private void getOrganisationsAndPersonalDataRights(ModelMap model){
    final String[] PDRights = { "Dreptul la informare", "Dreptul de acces la date",
        "Dreptul de intervenţie asupra datelor", "Dreptul de opoziţie",
        "Dreptul de a nu fi supus unei decizii individuale", "Dreptul de a se adresa justiţiei" };

    Pageable sortedById = PageRequest.of(0, 100, Sort.by("Id").descending());

    Page<Pair<Long, String>> organisations = organisationService.getOrganisationNames(sortedById);

    model.put("PDRights", PDRights);
    model.put("organisations", organisations);
  }

  @RequestMapping(value = "/gdpr/personal-data-request", method = RequestMethod.GET, produces = "text/html; charset=utf-8")
  public ModelAndView gdprRequest(ModelMap model) {

    getOrganisationsAndPersonalDataRights(model);
    model.addAttribute("requestFromPerson", new GDPRRequestFromThePersonDto());

    return new ModelAndView("gdpr/createRequest", model);
  }

  @RequestMapping(value = "/gdpr/personal-data-request/success", method = RequestMethod.GET, produces = "text/html; charset=utf-8")
  public ModelAndView gdprRequestSaveWithErrors(ModelMap model) {

    return new ModelAndView("gdpr/createWithSuccess", model);

  }

  @RequestMapping(
    value = "/gdpr/personal-data-request", 
    method = RequestMethod.POST, 
    produces = "text/html; charset=utf-8", 
    consumes = "application/x-www-form-urlencoded; charset=UTF-8")
  public ModelAndView gdprRequestSave(
    @Valid GDPRRequestFromThePersonDto requestFromPerson,    
    BindingResult bindingResult,
    ModelMap model) 
  {

    if(bindingResult.hasErrors()){

      getOrganisationsAndPersonalDataRights(model);

      List<String> errors = bindingResult.getAllErrors()
        .stream()
        .map(a -> a.getDefaultMessage())
        .collect(Collectors.toList());

      model.addAttribute("validationErrors", errors);
      model.addAttribute("requestFromPerson", requestFromPerson);

      return new ModelAndView("gdpr/createRequest", model);
    }else{
      requestForPersonalInfoService.addRequestForPersonalInfo(requestFromPerson);
      return new ModelAndView("redirect:/gdpr/personal-data-request/success", model);
    }

  }

}
