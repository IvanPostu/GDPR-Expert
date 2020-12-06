package com.app.services;

import com.app.domain.dto.CreateDataProcessingActivityDto;

public interface DataProcessingActivityService {
  
  Long addDataProcessingActivity(CreateDataProcessingActivityDto createDataProcessingActivityDto);

}
