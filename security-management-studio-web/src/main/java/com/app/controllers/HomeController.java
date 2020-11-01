package com.app.controllers;

import com.app.domain.entities.User;
import com.app.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {
  
  private UserService userService;

  @Autowired(required = true)
  @Qualifier(value = "userService")
  public void setUserService(UserService userService) {
    this.userService = userService;
  }
  
  @RequestMapping(value = "/home", method = RequestMethod.GET)
  public String listBooks() {
    
    // User user = new User();

    return "home";
  }

}
