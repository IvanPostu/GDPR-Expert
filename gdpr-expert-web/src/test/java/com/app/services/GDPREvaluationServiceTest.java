package com.app.services;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

import com.app.domain.dto.GDPREvaluationQuestionsDto;
import com.app.domain.entities.GDPREvaluationEntity;
import com.app.persistence.repositories.GDPREvaluationRepository;
import com.app.persistence.repositories.OrganisationRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class GDPREvaluationServiceTest {


  @Mock
  private GDPREvaluationRepository gDPREvaluationRepositoryMock;
  @Mock
  private OrganisationRepository organisationRepositoryMock;

  private GDPREvaluationService gDPREvaluationService;

  @BeforeEach
	public void setUp() {

		gDPREvaluationService = new GDPREvaluationServiceImpl(
      gDPREvaluationRepositoryMock, 
      organisationRepositoryMock
    );
	}


  @Test
  public void getQuestionsTest() throws IOException {
    GDPREvaluationQuestionsDto dto = gDPREvaluationService.getQuestions();
    Assertions.assertNotNull(dto);
    Assertions.assertEquals(dto.getCategories().size(), 6);
    Assertions.assertEquals(dto.getQuestions().size(), 32);

    /**
     * Check if question id is unique
     */
    Set<Integer> ids = dto.getQuestions()
      .stream()
      .map(a -> a.getId())
      .collect(Collectors.toSet());
  
    int setSize = ids.size();
    int questionsSize = dto.getQuestions().size();

    Assertions.assertEquals(setSize, questionsSize);
  }

  @Test
  void saveEvaluationResult(){
    Long organisationId = Long.valueOf(23L); 
    Float percentageEstimation = Float.valueOf(55.5f);

    ArgumentCaptor<GDPREvaluationEntity> argument = ArgumentCaptor
      .forClass(GDPREvaluationEntity.class);
      
    gDPREvaluationService.saveEvaluationResult(organisationId, percentageEstimation);  
    
    Mockito.verify(gDPREvaluationRepositoryMock).save(argument.capture());

    Assertions.assertEquals(organisationId, argument.getValue().getOrganisation().getId());
    Assertions.assertEquals(percentageEstimation, argument.getValue().getPercentageEstimation());
  }

  // List<GDPREvaluationEntity> getEvaluationResults(Long organisationId, Short limit);
  

}
