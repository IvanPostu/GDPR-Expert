package com.app.rest;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/auth")
public class AuthRestController {
  
  @PostMapping("/a")
  public ResponseEntity<?> abc(){
    HashMap<String, List<String>> result = new HashMap<>();
    result.put("errors", Arrays.asList("email_already_exists"));
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(result);
  }

  @GetMapping("/success")
  public ResponseEntity<?> authSuccess(){
    HashMap<String, String> result = new HashMap<>();
    result.put("login_current_status", "login_success");
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(result);
  }

  @GetMapping("/failure")
  public ResponseEntity<?> authFailure(){
    HashMap<String, String> result = new HashMap<>();
    result.put("login_current_status", "login_fail");
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(result);
  }

}
