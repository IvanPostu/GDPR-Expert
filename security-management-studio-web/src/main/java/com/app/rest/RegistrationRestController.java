package com.app.rest;

import java.util.Arrays;
import java.util.List;

import com.app.domain.dto.RegistrateUserDto;
import com.app.domain.entities.UserRoleEntity;

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


  @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Object> registerUser(@RequestBody RegistrateUserDto registrateUserDto) {

    UserRoleEntity r1 = new UserRoleEntity();
    r1.setId(1L);
    r1.setName("ABC");

    UserRoleEntity r2 = new UserRoleEntity();
    r2.setId(12323L);
    r2.setName("adfadfABC");

    List<UserRoleEntity> aa = Arrays.asList(
      r1, r2
    );

    return new ResponseEntity<Object>(aa, HttpStatus.OK);
  }

}
