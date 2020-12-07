package com.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {
  

  
  @RequestMapping(
    value = "/", 
    method = RequestMethod.GET, 
    produces = "text/html; charset=utf-8")
  public ModelAndView home(ModelMap model) {

    model.addAttribute("attribute", "redirectWithRedirectPrefix");
    return new ModelAndView("redirect:/gdpr/personal-data-request", model);
  }

}
