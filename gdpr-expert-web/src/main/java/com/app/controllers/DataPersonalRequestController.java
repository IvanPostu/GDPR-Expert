package com.app.controllers;

import com.app.domain.dto.GDPRRequestFromThePersonDto;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class DataPersonalRequestController {

  @RequestMapping(value = "/gdpr/personal-data-request", method = RequestMethod.GET, produces = "text/html; charset=utf-8")
  public ModelAndView gdprRequest(ModelMap model) {

    final String[] PDRights = { "Dreptul la informare", "Dreptul de acces la date",
        "Dreptul de intervenţie asupra datelor", "Dreptul de opoziţie",
        "Dreptul de a nu fi supus unei decizii individuale", "Dreptul de a se adresa justiţiei" };

    model.put("PDRights", PDRights);

    return new ModelAndView("gdpr/createRequest", model);
  } 


  @RequestMapping(
    value = "/gdpr/personal-data-request/result", 
    method = RequestMethod.GET, 
    produces = "text/html; charset=utf-8")
  public ModelAndView gdprRequestSaveWithErrors( 
    @RequestParam(value = "hasErrors") boolean hasErrors,
    ModelMap model) {

    if(!hasErrors){
      return new ModelAndView("gdpr/saveWithSuccess", model);
    }else{
      return new ModelAndView("gdpr/saveWithErrors", model);
    }

  }


  @RequestMapping(
      value = "/gdpr/personal-data-request", 
      method = RequestMethod.POST, 
      produces = "text/html; charset=utf-8")
  public ModelAndView gdprRequestSave(GDPRRequestFromThePersonDto requestFromPrson, ModelMap model) {

    

    return new ModelAndView("redirect:/", model);
  }

}
