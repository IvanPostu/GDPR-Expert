package com.app.persistence.repositories;

import java.util.List;

import com.app.domain.entities.DataProcessingActivityEntity;
import org.springframework.data.repository.Repository;


public interface DataProcessingActivityRepository  
  extends Repository<DataProcessingActivityEntity, Long> 
{

  void save(DataProcessingActivityEntity dataProcessingActivityEntity);

  List<DataProcessingActivityEntity> getDataProcessingActivitiesForOrganisation(
    Long userId, 
    Long organisationId
  );

  List<DataProcessingActivityEntity> getDataProcessingActivitiesForDepartment(
    Long userId, 
    Long departmentId
  );

  DataProcessingActivityEntity getDataProcessingActivityById(Long dataProcessingActivityId);
  
  void removeById(Long dataProcessingActivityId);

  Long count();
  
}
