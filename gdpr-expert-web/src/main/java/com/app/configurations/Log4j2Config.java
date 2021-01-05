package com.app.configurations;

import java.net.URI;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.config.LoggerConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Log4j2Config {
  private static final Logger logger = LoggerFactory.getLogger(LoggerConfig.class);

  public static void configureLog4j2(String profile){
    LoggerContext context = (LoggerContext)LogManager.getContext(false);

    if(profile.equals("production")){
      context.setConfigLocation(URI.create("classpath:log4j2.production.xml"));
      context.reconfigure();
      logger.info("Log4j configuration file loaded for production");
    }

    if(profile.equals("development")){
      context.setConfigLocation(URI.create("classpath:log4j2.development.xml"));
      context.reconfigure();
      logger.info("Log4j configuration file loaded for development");
    }
  }

}