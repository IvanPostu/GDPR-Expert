package com.app.rest;

import java.util.List;

import com.app.domain.dto.CreateDataProcessingActivityDto;
import com.app.domain.dto.DataProcessingActivityInfoDto;
import com.app.domain.dto.DataProcessingActivityItemDto;
import com.app.domain.entities.AuthUserEntity;
import com.app.services.DataProcessingActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
  public ResponseEntity<Object> getDepartmentById(@AuthenticationPrincipal AuthUserEntity user,
      @RequestBody CreateDataProcessingActivityDto createDataProcessingActivityDto) {

    Long id = dataProcessingActivityService.addDataProcessingActivity(createDataProcessingActivityDto);

    return ResponseEntity.status(HttpStatus.CREATED).body(id);
  }

  @RequestMapping(value = "", method = RequestMethod.GET)
  public ResponseEntity<Object> getDataProcessingActivities(@AuthenticationPrincipal AuthUserEntity user, @RequestParam(value = "organisationId") Long organisationId) {

    List<DataProcessingActivityItemDto> activities = dataProcessingActivityService
      .getDataProcessingActivitiesForOrganisation(user.getId(), organisationId);

    return ResponseEntity.status(HttpStatus.OK).body(activities);
  }

  @RequestMapping(value = "/info/{dataProcessingActivityId}", method = RequestMethod.GET)
  public ResponseEntity<Object> getDataProcessingActivityInfo(
    @AuthenticationPrincipal AuthUserEntity user, 
    @PathVariable(value = "dataProcessingActivityId") Long dataProcessingActivityId) {

    DataProcessingActivityInfoDto result = dataProcessingActivityService
      .getDataProcessingActivityInfo(dataProcessingActivityId);

    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
