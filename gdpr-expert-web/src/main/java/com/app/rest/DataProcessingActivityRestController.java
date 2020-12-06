package com.app.rest;

import com.app.domain.dto.CreateDataProcessingActivityDto;
import com.app.domain.entities.UserEntity;
import com.app.services.DataProcessingActivityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/dataProcessingActivity")
public class DataProcessingActivityRestController {
  
  private final DataProcessingActivityService dataProcessingActivityService;

  @Autowired
  public DataProcessingActivityRestController(DataProcessingActivityService dataProcessingActivityService) {
    this.dataProcessingActivityService = dataProcessingActivityService;
  }
  

  @RequestMapping(value = "", method = RequestMethod.POST)
  public ResponseEntity<Object> getDepartmentById(@AuthenticationPrincipal UserEntity user,
    @RequestBody CreateDataProcessingActivityDto createDataProcessingActivityDto) {

    Long id = dataProcessingActivityService
      .addDataProcessingActivity(createDataProcessingActivityDto);

    return ResponseEntity.status(HttpStatus.CREATED).body(id);
  }


}
