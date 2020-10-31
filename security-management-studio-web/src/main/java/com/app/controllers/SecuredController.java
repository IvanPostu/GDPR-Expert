package com.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SecuredController {
  
  @RequestMapping(value = "/secured", method = RequestMethod.GET)
  public String listBooks() {

    return "secured";
  }

}
