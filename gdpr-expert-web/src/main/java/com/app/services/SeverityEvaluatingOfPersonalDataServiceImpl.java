package com.app.services;

import java.util.Date;

import com.app.domain.dto.SeverityEvaluatingOfPersonalDataDto;
import com.app.domain.entities.DataProcessingActivityEntity;
import com.app.domain.entities.SeverityEvaluatingOfPersonalDataEntity;
import com.app.persistence.repositories.SeverityEvaluatingOfPersonalDataRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class SeverityEvaluatingOfPersonalDataServiceImpl implements SeverityEvaluatingOfPersonalDataService {

  private final SeverityEvaluatingOfPersonalDataRepository severityEvaluatingOfPersonalDataRepository;

  @Autowired
  public SeverityEvaluatingOfPersonalDataServiceImpl(
      SeverityEvaluatingOfPersonalDataRepository severityEvaluatingOfPersonalDataRepository) {
    this.severityEvaluatingOfPersonalDataRepository = severityEvaluatingOfPersonalDataRepository;
  }

  @Override
  public void save(SeverityEvaluatingOfPersonalDataDto severityEvaluatingOfPersonalDataDto) {
    SeverityEvaluatingOfPersonalDataEntity e = new SeverityEvaluatingOfPersonalDataEntity();
    DataProcessingActivityEntity dataProcessingActivityEntity = new DataProcessingActivityEntity();
    dataProcessingActivityEntity.setId(severityEvaluatingOfPersonalDataDto.getDataProcessingActivityId());

    e.setDataProcessingActivity(dataProcessingActivityEntity);
    e.setId(dataProcessingActivityEntity.getId());
    e.setCircumstancesOfCompromiseGrade(severityEvaluatingOfPersonalDataDto.getCircumstancesOfCompromiseGrade());
    e.setDataProcessingContextGrade(severityEvaluatingOfPersonalDataDto.getDataProcessingContextGrade());
    e.setEaseOfIdentificationGrade(severityEvaluatingOfPersonalDataDto.getEaseOfIdentificationGrade());
    e.setEvaluatedAt(new Date());
    
 
    severityEvaluatingOfPersonalDataRepository.save(e);

  }

  @Override
  public SeverityEvaluatingOfPersonalDataEntity findById(Long severityEvaluatingOfPersonalDataId) {
    SeverityEvaluatingOfPersonalDataEntity e = severityEvaluatingOfPersonalDataRepository.findById(severityEvaluatingOfPersonalDataId);


    return e;
  }

}
