package com.app.beans;

import java.text.SimpleDateFormat;

public class ApplicationDateFormatter {
  /**
  * yyyy-MM-dd
  */
  public SimpleDateFormat getApplicationDateFormat(){
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    return formatter;
  }
}
