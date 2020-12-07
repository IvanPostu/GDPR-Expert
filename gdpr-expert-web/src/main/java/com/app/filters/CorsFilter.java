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

    httpResponse.setHeader("Access-Control-Allow-Origin", "127.0.0.1");
    httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
    httpResponse.setHeader("Access-Control-Allow-Methods", "*");
    httpResponse.setHeader("Access-Control-Max-Age", "3600");
    httpResponse.setHeader("Access-Control-Allow-Headers", "*");

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