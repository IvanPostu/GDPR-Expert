package com.app.beans;

import java.time.format.DateTimeFormatter;


public class ApplicationDateTimeFormatter {
  /**
  * yyyy-MM-dd'T'HH:mm:ss.SSSXXX
  */
  public DateTimeFormatter getApplicationDateTimeFormat(){
    return  DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
  }
}
