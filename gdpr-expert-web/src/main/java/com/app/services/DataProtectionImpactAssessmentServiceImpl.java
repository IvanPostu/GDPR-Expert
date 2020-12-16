package com.app.services;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Consumer;

import javax.transaction.Transactional;

import com.app.beans.ApplicationDateFormatter;
import com.app.domain.dto.DataProtectionImpactAssessmentRequestDto;
import com.app.domain.entities.DataProcessingActivityEntity;
import com.app.domain.entities.DataProtectionImpactAssessmentEntity;
import com.app.domain.entities.DepartmentEntity;
import com.app.domain.entities.OrganisationEntity;
import com.app.persistence.repositories.DataProcessingActivityRepository;
import com.app.persistence.repositories.DataProtectionImpactAssessmentRepository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ResourceUtils;

public class DataProtectionImpactAssessmentServiceImpl implements DataProtectionImpactAssessmentService {

  private static final Logger logger = LogManager.getLogger(DataProtectionImpactAssessmentServiceImpl.class);

  private final DataProcessingActivityRepository dataProcessingActivityRepository;
  private final DataProtectionImpactAssessmentRepository dataProtecDataProtectionImpactAssessmentRepository;
  private final ApplicationDateFormatter dateFormatter;

  @Autowired
  public DataProtectionImpactAssessmentServiceImpl(DataProcessingActivityRepository dataProcessingActivityRepository,
      DataProtectionImpactAssessmentRepository dataProtecDataProtectionImpactAssessmentRepository, ApplicationDateFormatter dateFormatter) {
    this.dataProcessingActivityRepository = dataProcessingActivityRepository;
    this.dataProtecDataProtectionImpactAssessmentRepository = dataProtecDataProtectionImpactAssessmentRepository;
    this.dateFormatter = dateFormatter;
  }

  private void replaceAllCoincides(XWPFDocument doc, Map<String, Object> dictionary) {

    Consumer<XWPFRun> checkAndReplace = (run) -> {
      String text = run.getText(0);
      if (text != null && text.startsWith("#")) {
        Object itemFromDictionary = dictionary.get(text);
        if (text.startsWith("#img_")) {
          try {
            run.setText("", 0);
            byte[] imgBytes = (byte[]) itemFromDictionary;
            if(imgBytes != null){
              ByteArrayInputStream img = new ByteArrayInputStream(imgBytes);
              run.addPicture(img, XWPFDocument.PICTURE_TYPE_JPEG, "logo.jpg",150,150); 
            }
          } catch (InvalidFormatException | IOException e) {
            logger.error(e);
          }
        }else{
          if(itemFromDictionary!=null && itemFromDictionary instanceof String){
            run.setText((String)itemFromDictionary, 0);
            run.setColor("000000");
          }
        }
      }
    };

    for (XWPFParagraph p : doc.getParagraphs()) {
      List<XWPFRun> runs = p.getRuns();
      if (runs != null) {
        for (XWPFRun r : runs) {
          checkAndReplace.accept(r);
        }
      }
    }

    for (XWPFTable tbl : doc.getTables()) {
      for (XWPFTableRow row : tbl.getRows()) {
        for (XWPFTableCell cell : row.getTableCells()) {
          for (XWPFParagraph p : cell.getParagraphs()) {
            for (XWPFRun r : p.getRuns()) {
              checkAndReplace.accept(r);
            }
          }
        }
      }
    }
  }

  @Transactional
  @Override
  public void evaluateDataProtectionImpactAssessment(
      DataProtectionImpactAssessmentRequestDto dataProtectionImpactAssessmentRequestDto) {
        
    logger.debug("evaluateDataProtectionImpactAssessment method called");
    
    try {

      File templateFile = ResourceUtils.getFile("classpath:gdpr/DPIA_EIPD_TEMPLATE01.docx");
      XWPFDocument doc = new XWPFDocument(OPCPackage.open(templateFile));
      Map<String, Object> dictionary = new HashMap<>();
      Long dataProcessingActivityId = dataProtectionImpactAssessmentRequestDto
        .getDataProcessingActivityId();

      DataProcessingActivityEntity dataProcessingActivity = dataProcessingActivityRepository
        .getDataProcessingActivity(dataProcessingActivityId);

      DepartmentEntity departmentEntity = dataProcessingActivity.getDepartment();
      OrganisationEntity organisationEntity = dataProcessingActivity.getOrganisation();

      dictionary.put("#orgName", organisationEntity.getName());
      dictionary.put("#depName", departmentEntity.getName());
      dictionary.put("#img_orgLogo", null);

      dictionary.put("#activityCode", String.valueOf(dataProcessingActivity.getId()));
      dictionary.put("#assessmentCode", UUID.randomUUID().toString());
      dictionary.put("#assessmentDate", dateFormatter.format(new Date()));
      dictionary.put("#assessmentConfidentialityLevel", "1");

      dictionary.put("#stageOneDataDetails", dataProtectionImpactAssessmentRequestDto
        .getStageOneDataDetails());
      dictionary.put("#stageTwoCurrentSetOfMeasures", dataProtectionImpactAssessmentRequestDto
        .getStageTwoCurrentSetOfMeasures());
      dictionary.put("#stageThreeSourcesOfRisk", dataProtectionImpactAssessmentRequestDto
        .getStageThreeSourcesOfRisk());
      dictionary.put("#stageFourPotentialAdverseEventsAndThreats", 
        dataProtectionImpactAssessmentRequestDto.getStageFourPotentialAdverseEventsAndThreats());
      dictionary.put("#stageFiveSummaryAnalysisAndCurrentControls", 
        dataProtectionImpactAssessmentRequestDto.getStageFiveSummaryAnalysisAndCurrentControls());

      replaceAllCoincides(doc, dictionary);
      logger.debug("document template edited with success!!!");

      DataProtectionImpactAssessmentEntity dataProtectionImpactAssessmentEntity = new DataProtectionImpactAssessmentEntity();

      ByteArrayOutputStream bos = new ByteArrayOutputStream();
      try {
        doc.write(bos);
      } finally {
        bos.close();
      }
      byte[] bytes = bos.toByteArray();

      DataProcessingActivityEntity processingActivityEntity = new DataProcessingActivityEntity();
      processingActivityEntity.setId(dataProcessingActivityId);
      dataProtectionImpactAssessmentEntity.setDataProcessingActivity(processingActivityEntity);
      dataProtectionImpactAssessmentEntity.setId(dataProcessingActivityId);
      dataProtectionImpactAssessmentEntity.setDocumentFile(bytes);

      StringBuilder filenameSB = new StringBuilder();
      filenameSB
        .append("DPIA_Report_Activity___")
        .append(dataProcessingActivityId)
        .append(".docx");

      dataProtectionImpactAssessmentEntity.setFileName(filenameSB.toString());

      dataProtecDataProtectionImpactAssessmentRepository.save(dataProtectionImpactAssessmentEntity);
      
    } catch (Exception e) {
      logger.error(e);
      throw new RuntimeException(e);
    }

  }

  @Override
  public DataProtectionImpactAssessmentEntity getDataProtectionImpactAssessmentById(Long id) {
    DataProtectionImpactAssessmentEntity res = dataProtecDataProtectionImpactAssessmentRepository
      .getById(id);

    
    return res;
  }


}
