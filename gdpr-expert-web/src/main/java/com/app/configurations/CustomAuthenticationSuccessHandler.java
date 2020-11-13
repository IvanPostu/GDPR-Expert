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

        
    // HttpSession session = httpServletRequest.getSession();
    // UserEntity authUser = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    // session.setAttribute("userId", authUser.getId());
    // session.setAttribute("authorities", authentication.getAuthorities());

    httpServletResponse.setStatus(HttpServletResponse.SC_OK);
    httpServletResponse.sendRedirect("/api/auth/success");
  }

}