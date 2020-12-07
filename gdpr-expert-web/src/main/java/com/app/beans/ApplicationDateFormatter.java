package com.app.beans;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


public class ApplicationDateFormatter {

  final SimpleDateFormat formatter;

  public ApplicationDateFormatter() {
    this.formatter = new SimpleDateFormat("yyyy-MM-dd");
  }

  
  /**
   * yyyy-MM-dd
   */
  public SimpleDateFormat getApplicationDateFormat() {
    return formatter;
  }

  public Date format(String date) throws ParseException {
    return this.formatter.parse(date);
  }

  public String format(Date date) throws ParseException {
    return formatter.format(date);
  }
}
