package com.app.services;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import com.app.domain.dto.GDPREvaluationQuestionsDto;
import com.app.domain.entities.GDPREvaluationEntity;
import com.app.domain.entities.OrganisationEntity;
import com.app.persistence.repositories.GDPREvaluationRepository;
import com.app.persistence.repositories.OrganisationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.util.ResourceUtils;

public class GDPREvaluationServiceImpl implements GDPREvaluationService {

  private final GDPREvaluationRepository gDPREvaluationRepository;
  private final OrganisationRepository organisationRepository;

  @Autowired
  public GDPREvaluationServiceImpl(
      @Qualifier(value = "GDPREvaluationRepositoryImpl") GDPREvaluationRepository gDPREvaluationRepository,
      OrganisationRepository organisationRepository) {
    this.gDPREvaluationRepository = gDPREvaluationRepository;
    this.organisationRepository = organisationRepository;
  }

  @Override
  public GDPREvaluationQuestionsDto getQuestions() throws IOException {

    ObjectMapper objectMapper = new ObjectMapper();
    File file = ResourceUtils.getFile("classpath:gdpr/RGPD_evaluation.MD.json");
    String json = Files.readAllLines(file.toPath(), StandardCharsets.UTF_8).stream().reduce("", (a, c) -> a + c);

    GDPREvaluationQuestionsDto result = objectMapper.readValue(json, GDPREvaluationQuestionsDto.class);

    return result;
  }

  @Override
  public void saveEvaluationResult(Long organisationId, Float percentageEstimation) {
    GDPREvaluationEntity evaluationEntity = new GDPREvaluationEntity();
    evaluationEntity.setPercentageEstimation(percentageEstimation);
    evaluationEntity.setCompletedAt(new Date());

    OrganisationEntity o = new OrganisationEntity();
    o.setId(organisationId);

    evaluationEntity.setOrganisation(o);

    gDPREvaluationRepository.save(evaluationEntity);
  }

  @Transactional
  @Override
  public List<GDPREvaluationEntity> getEvaluationResults(Long organisationId, Short limit) {
    OrganisationEntity oEntity = organisationRepository.findById(organisationId).get();

    List<GDPREvaluationEntity> result = oEntity.getEvaluations();

    if(result.size() > limit){
      result = result.subList(result.size() - limit, result.size());
    }

    return new ArrayList<>(result);
  }

}
