package com.app.persistence.repositories;

import java.util.List;

import com.app.domain.entities.DataProcessingActivityEntity;


public interface DataProcessingActivityRepository {
  
  void save(DataProcessingActivityEntity dataProcessingActivityEntity);

  List<DataProcessingActivityEntity> getDataProcessingActivities(Long userId, Long organisationId);

  DataProcessingActivityEntity getDataProcessingActivity(Long dataProcessingActivityId);
}
