package com.app.services;

import java.text.ParseException;
import java.util.Date;

import com.app.beans.ApplicationDateFormatter;
import com.app.domain.dto.CreateDataProcessingActivityDto;
import com.app.domain.entities.DataProcessingActivityEntity;
import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.EmployeeEntity;
import com.app.domain.entities.OrganisationEntity;
import com.app.persistence.repositories.DataProcessingActivityRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class DataProcessingActivityServiceImpl implements DataProcessingActivityService {

  private DataProcessingActivityRepository dataProcessingActivityRepository;

  private ApplicationDateFormatter dateFormatter;

  @Autowired
  public DataProcessingActivityServiceImpl(DataProcessingActivityRepository dataProcessingActivityRepository,
      ApplicationDateFormatter dateFormatter) {
    this.dataProcessingActivityRepository = dataProcessingActivityRepository;
    this.dateFormatter = dateFormatter;
  }

  @Override
  public Long addDataProcessingActivity(CreateDataProcessingActivityDto createDataProcessingActivityDto) {

    DataProcessingActivityEntity d = new DataProcessingActivityEntity();

    Date beginningOfTheActivity = new Date();
    Date endOfTheActivity = new Date();

    try {
      beginningOfTheActivity = dateFormatter
        .format(createDataProcessingActivityDto.getBeginningOfTheActivity());
      endOfTheActivity = dateFormatter
        .format(createDataProcessingActivityDto.getEndOfTheActivity());
    } catch (ParseException e) {
      throw new RuntimeException("Date parse exception!!!");
    }

    d.setActivityName(createDataProcessingActivityDto.getActivityName());
    d.setBeginningOfTheActivity(beginningOfTheActivity);
    d.setEndOfTheActivity(endOfTheActivity);
    d.setDataOwner(createDataProcessingActivityDto.getDataOwner());
    d.setDescription(createDataProcessingActivityDto.getDescription());
    d.setPurposes(createDataProcessingActivityDto.getPurposes());
    d.setSensitiveData(createDataProcessingActivityDto.isDataIsSensible());
    d.setStatus(DataProcessingActivityEntity.Status.WAIT.name());

    DepartmentEntity department = new DepartmentEntity();
    department.setId(createDataProcessingActivityDto.getDepartmentId());
    d.setDepartment(department);

    EmployeeEntity employeeEntity = new EmployeeEntity();
    employeeEntity.setId(createDataProcessingActivityDto.getDataResponsibleEmployeeId());
    d.setEmployee(employeeEntity);

    OrganisationEntity organisation = new OrganisationEntity();
    organisation.setId(createDataProcessingActivityDto.getOrganisationId());
    d.setOrganisation(organisation);

    dataProcessingActivityRepository.save(d);

    return d.getId();
  }

}
