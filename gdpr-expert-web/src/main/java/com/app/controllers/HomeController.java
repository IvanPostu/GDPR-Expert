package com.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {
  
  // private UserService userService;

  // @Autowired(required = true)
  // @Qualifier(value = "userService")
  // public void setUserService(UserService userService) {
  //   this.userService = userService;
  // }
  
  @RequestMapping(value = "/home", method = RequestMethod.GET)
  public String home() {
 
    // UserEntity user = userService.getUserByEmail("e8daaaa@mail.ru");

    return "home";
  }

}
