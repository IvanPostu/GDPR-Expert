package com.app.rest;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import com.app.domain.dto.DataProtectionImpactAssessmentRequestDto;
import com.app.domain.entities.DataProtectionImpactAssessmentEntity;
import com.app.domain.entities.AuthUserEntity;
import com.app.services.DataProtectionImpactAssessmentService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/dataProtectionImpactAssessment")
public class DataProtectionImpactAssessmentRestController {
  private static final Logger logger = LogManager.getLogger(DataProtectionImpactAssessmentRestController.class);

  private final DataProtectionImpactAssessmentService dataProtectionImpactAssessmentService;

  @Autowired
  public DataProtectionImpactAssessmentRestController(
      DataProtectionImpactAssessmentService dataProtectionImpactAssessmentService) {
    this.dataProtectionImpactAssessmentService = dataProtectionImpactAssessmentService;
  }


  @RequestMapping(value = "/realize", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> realizeDataProtectionImpact(@AuthenticationPrincipal AuthUserEntity user,
      @RequestBody DataProtectionImpactAssessmentRequestDto dataProtectionImpactAssessmentRequestDto) {

    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
    Set<ConstraintViolation<DataProtectionImpactAssessmentRequestDto>> violations = validator
        .validate(dataProtectionImpactAssessmentRequestDto);

    if (violations.size() > 0) {
      List<String> errors = violations
        .stream().map(a -> a.getMessage())
        .collect(Collectors.toList());

      logger.info("Validation error");
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(errors);
    }

    dataProtectionImpactAssessmentService
      .evaluateDataProtectionImpactAssessment(dataProtectionImpactAssessmentRequestDto);
    
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @RequestMapping(value = "/download", method = RequestMethod.GET)
  public void downloadDataProtectionimpactDocument(
      HttpServletRequest request, 
      HttpServletResponse response,
      @RequestParam(value = "dataProtectionImpactAssessmentId", required = true) 
      Long dataProtectionImpactAssessmentId) throws IOException {

    DataProtectionImpactAssessmentEntity dataProtectionImpactAssessment = 
      dataProtectionImpactAssessmentService
        .getDataProtectionImpactAssessmentById(dataProtectionImpactAssessmentId);

    if(dataProtectionImpactAssessment == null){
      response.setStatus(HttpStatus.NO_CONTENT.value());
    }else{
      byte[] output = dataProtectionImpactAssessment.getDocumentFile();
  
      response.setContentLength(output.length);
      response.setContentType(MediaType.ALL_VALUE);
      String contentDisposition = String.format("attachment; filename=%s", 
        dataProtectionImpactAssessment.getFileName());
      response.setHeader("Content-Disposition", contentDisposition);
  
      try {
        response.getOutputStream().write(output);
        response.getOutputStream().flush();
      } catch (IOException ex) {
        logger.warn(ex);
      }
    }

  }

}
