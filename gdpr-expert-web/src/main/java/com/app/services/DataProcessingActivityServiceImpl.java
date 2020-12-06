package com.app.services;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.app.beans.ApplicationDateFormatter;
import com.app.domain.dto.CreateDataProcessingActivityDto;
import com.app.domain.dto.DataProcessingActivityInfoDto;
import com.app.domain.dto.DataProcessingActivityItemDto;
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
      beginningOfTheActivity = dateFormatter.format(createDataProcessingActivityDto.getBeginningOfTheActivity());
      endOfTheActivity = dateFormatter.format(createDataProcessingActivityDto.getEndOfTheActivity());
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
    d.setStatus(createDataProcessingActivityDto.getStatus());

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

  @Transactional
  @Override
  public List<DataProcessingActivityItemDto> getDataProcessingActivities(Long userId, Long organisationid) {
    List<DataProcessingActivityEntity> activities = dataProcessingActivityRepository.getDataProcessingActivities(userId,
        organisationid);

    List<DataProcessingActivityItemDto> result = activities.stream().map(a -> {
      DataProcessingActivityItemDto item = DataProcessingActivityItemDto.builder().activityId(a.getId())
          .activityName(a.getActivityName())
          .dataOwnerFullname(a.getEmployee().getFirstName() + ' ' + a.getEmployee().getLastName())
          .dataProcessingResponsibleEmployeeFullname(a.getDataOwner()).departmentId(a.getDepartment().getId())
          .departmentName(a.getDepartment().getName()).organisationId(a.getOrganisation().getId())
          .organisationName(a.getOrganisation().getName()).processingPurposes(a.getPurposes()).status(a.getStatus())
          .build();

      return item;
    }).collect(Collectors.toList());

    return result;
  }

  @Transactional
  @Override
  public DataProcessingActivityInfoDto getDataProcessingActivityInfo(Long dataProcessingActivityId) {
    DataProcessingActivityEntity activity = dataProcessingActivityRepository
        .getDataProcessingActivity(dataProcessingActivityId);


    String beginningOfTheActivity;
    String endOfTheActivity;

    try{
      beginningOfTheActivity = dateFormatter.format(activity.getBeginningOfTheActivity());
      endOfTheActivity = dateFormatter.format(activity.getEndOfTheActivity());
    }catch(Exception e){
      throw new RuntimeException();
    }
    
    String employeeFullName = activity.getEmployee().getFirstName() + ' ' 
      + activity.getEmployee().getLastName();

    DataProcessingActivityInfoDto dto = DataProcessingActivityInfoDto
      .builder()
      .activityId(activity.getId())
      .activityName(activity.getActivityName())
      .beginningOfTheActivity(beginningOfTheActivity)
      .endOfTheActivity(endOfTheActivity)
      .dataIsSensible(activity.isSensitiveData()).dataOwner(activity.getDataOwner())
      .dataProcessingResponsibleEmployeeFullname(employeeFullName)
      .dataResponsibleEmployeeId(activity.getEmployee().getId())
      .description(activity.getDescription())
      .departmentId(activity.getDepartment().getId())
      .departmentName(activity.getDepartment().getName())
      .organisationId(activity.getOrganisation().getId())
      .organisationName(activity.getOrganisation().getName())
      .purposes(activity.getPurposes()).status(activity.getStatus()).build();

    return dto;

  }

}
