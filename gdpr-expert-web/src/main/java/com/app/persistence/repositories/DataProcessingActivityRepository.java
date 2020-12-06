package com.app.persistence.repositories;

import com.app.domain.entities.DataProcessingActivityEntity;


public interface DataProcessingActivityRepository {
  
  void save(DataProcessingActivityEntity dataProcessingActivityEntity);

}
