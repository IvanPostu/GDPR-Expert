package com.app.services;

import java.util.List;

import com.app.domain.dto.CreateDataProcessingActivityDto;
import com.app.domain.dto.DataProcessingActivityItemDto;

public interface DataProcessingActivityService {
  
  Long addDataProcessingActivity(CreateDataProcessingActivityDto createDataProcessingActivityDto);

  List<DataProcessingActivityItemDto> getDataProcessingActivities(Long userId, Long organisationid);

}
