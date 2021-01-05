package com.app.configurations;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ResourceUtils;
import org.springframework.web.WebApplicationInitializer;

public class WebInitializer implements WebApplicationInitializer {
  private static final Logger logger = LoggerFactory.getLogger(WebInitializer.class);

  @Override
  public void onStartup(ServletContext servletContext) {
    Properties globalProperties = new Properties();

    try {
      File file = ResourceUtils.getFile("classpath:global.properties");
      InputStream inStream = new FileInputStream(file);
      globalProperties.load(inStream);

      String currentProfile = globalProperties.getProperty("spring.profiles.active");

      if ("development".equals(currentProfile) || "production".equals(currentProfile)) {
        servletContext.setAttribute("spring.profiles.active", currentProfile);
        logger.info("APPLICATION PROFILE: " + currentProfile);
      } else {
        currentProfile = "production";
        servletContext.setAttribute("spring.profiles.active", currentProfile);
        logger.info("APPLICATION PROFILE BY DEFAULT: " + currentProfile);
      }

      Log4j2Config.configureLog4j2(currentProfile);

    } catch (Exception e) {
      logger.error(e.getLocalizedMessage());
      logger.error("global.properties file in classpath is required.", e);
      System.exit(1);
    }

  }

}