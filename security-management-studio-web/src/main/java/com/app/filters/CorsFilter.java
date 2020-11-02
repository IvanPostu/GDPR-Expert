package com.app.filters;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import java.io.IOException;

public class CorsFilter implements Filter {


  @Override
  public void init(FilterConfig filterConfig) throws ServletException {

  }

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
      throws IOException, ServletException {
    HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
    HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;

    // final String sameSiteAttribute = "; SameSite=None";
    // final String secureAttribute = "; Secure";
        

    httpResponse.setHeader("Access-Control-Allow-Origin", "127.0.0.1");
    httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
    httpResponse.setHeader("Access-Control-Allow-Methods", "*");
    httpResponse.setHeader("Access-Control-Max-Age", "3600");
    httpResponse.setHeader("Access-Control-Allow-Headers", "*");

    // httpResponse.setHeader("Set-Cookie", sameSiteAttribute + secureAttribute);

    // httpResponse.setHeader(HttpHeaders.SET_COOKIE, "*");
    // httpResponse.setHeader("Set-Cookie", "SameSite=None;  HttpOnly; Secure");
    // httpResponse.addHeader(HttpHeaders.SET_COOKIE,
    // String.format("%s; %s", header, "SameSite=Strict"));

    if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
      httpResponse.setStatus(HttpServletResponse.SC_OK);
    } else {
      filterChain.doFilter(httpRequest, httpResponse);
    }
  }

  @Override
  public void destroy() {

  }
}