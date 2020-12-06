package com.app.rest;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import com.app.domain.dto.RegistrateUserDto;
import com.app.domain.entities.UserEntity;
import com.app.domain.entities.UserRoleEntity;
import com.app.services.UserService;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/registration")
public class RegistrationRestController {
  private final UserService userService;

  @Autowired
  public RegistrationRestController(UserService userService){
    this.userService = userService;
  }

  @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> registerUser(@RequestBody RegistrateUserDto registrateUserDto) {

    UserRoleEntity defaultUserRole = UserEntity.userRole();
    UserEntity user = new UserEntity();

    user.setActive(true);
    user.setEmail(registrateUserDto.getEmail());
    user.setPassword(registrateUserDto.getPassword());
    user.setRoles(Arrays.asList(defaultUserRole));

    try{
      userService.addUser(user);
    }catch(Exception e){

      if(e.getCause() instanceof ConstraintViolationException){
        ConstraintViolationException ce = (ConstraintViolationException)e.getCause();
        if(ce.getConstraintName().equals("user_unique_email")){
          HashMap<String, List<String>> result = new HashMap<>();
          result.put("errors", Arrays.asList("email_already_exists"));
          return ResponseEntity.status(HttpStatus.ACCEPTED).body(result);
        }
      }
    }

    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

}
