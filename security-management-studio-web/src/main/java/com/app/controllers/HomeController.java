package com.app.controllers;

import java.util.Arrays;
import java.util.HashSet;
import java.util.UUID;

import com.app.domain.entities.UserEntity;
import com.app.domain.entities.UserRoleEntity;
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
  public String home() {
    // String s = UUID.randomUUID().toString().substring(0, 3);

    // UserEntity user = new UserEntity();
    // user.setActive(true);

    // UserRoleEntity role = new UserRoleEntity();
    // role.setName("USER");
    // user.setRoles(Arrays.asList(role));

    // user.setEmail(s + "aaaa@mail.ru");
    // user.setPassword("qwerty");


    // userService.addUser(user);

    UserEntity user = userService.getUserByEmail("e8daaaa@mail.ru");

    return "home";
  }

}
