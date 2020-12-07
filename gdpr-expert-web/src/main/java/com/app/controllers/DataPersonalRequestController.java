package com.app.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller

public class DataPersonalRequestController {
  
    
  @RequestMapping(
    value = "/gdpr/personal-data-request", 
    method = RequestMethod.GET, 
    produces = "text/html; charset=utf-8")
  public String geprRequest() {

    return "gdpr/index";
  }

}
