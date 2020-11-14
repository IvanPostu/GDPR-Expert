package com.app.configurations;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

  @Override
  public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
      Authentication authentication) throws IOException, ServletException {

      
    httpServletResponse.getWriter().write("login_success");
    httpServletResponse.setStatus(HttpServletResponse.SC_OK);
  }

}