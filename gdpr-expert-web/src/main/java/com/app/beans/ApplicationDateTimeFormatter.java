package com.app.beans;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


public class ApplicationDateTimeFormatter {

  private final DateTimeFormatter dateTimeFormatter;

  public ApplicationDateTimeFormatter(){
    this.dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
  }

  public String parse(LocalDateTime dateTime){
    return dateTime.format(dateTimeFormatter);
  }

  public LocalDateTime parse(String dateTime){
    return LocalDateTime.parse(dateTime, dateTimeFormatter);
  }

  /**
  * yyyy-MM-dd'T'HH:mm:ss.SSSXXX
  */
  public DateTimeFormatter getApplicationDateTimeFormat(){
    return  dateTimeFormatter;
  }
}
