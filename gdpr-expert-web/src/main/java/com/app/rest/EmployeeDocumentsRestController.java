package com.app.rest;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.app.domain.dto.EmployeeDocumentInfoDto;
import com.app.domain.entities.EmployeeDocumentEntity;
import com.app.services.EmployeeDocumentService;
import com.app.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/api/employee/docs")
public class EmployeeDocumentsRestController {

  private final EmployeeService employeeService;
  private final EmployeeDocumentService employeeDocumentService;

  @Autowired
  public EmployeeDocumentsRestController(EmployeeService employeeService,
      EmployeeDocumentService employeeDocumentService) {
    this.employeeService = employeeService;
    this.employeeDocumentService = employeeDocumentService;
  }

  @RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> addEmployeeDocument(@RequestParam(required = true, value = "files") MultipartFile[] files,
      @RequestParam(required = true, value = "employeeId") Long employeeId) throws IOException {

    employeeService.addDocumentsToEmployee(employeeId, files);

    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @RequestMapping(value = "", method = RequestMethod.GET)
  public void downloadDocumentForEmployee(HttpServletRequest request, HttpServletResponse response,
      @RequestParam(value = "employeeId", required = true) Long employeeId,
      @RequestParam(value = "documentId", required = true) Long documentId) throws IOException {

    EmployeeDocumentEntity document = employeeDocumentService.getDocumentById(documentId).get();
    byte[] output = null;//document.getDocumentDataBlob();

    response.setContentLength(output.length);
    response.setContentType(MediaType.ALL_VALUE);
    String contentDisposition = String.format("attachment; filename=%s", document.getFileName());
    response.setHeader("Content-Disposition", contentDisposition);

    try {
      response.getOutputStream().write(output);
      response.getOutputStream().flush();
    } catch (IOException ex) {
      ex.printStackTrace();
    }
  }

  @RequestMapping(value = "/all/{employeeId}", method = RequestMethod.GET)
  public ResponseEntity<Collection<EmployeeDocumentInfoDto>> getEmployeeDocumentsInfo(
      @PathVariable(value = "employeeId") Long employeeId) {

    Collection<EmployeeDocumentInfoDto> documents = employeeDocumentService.getEmployeeDocuments(employeeId);

    return ResponseEntity.status(HttpStatus.OK).body(documents);
  }

  @RequestMapping(value = "/{documentId}", method = RequestMethod.DELETE)
  public ResponseEntity<Long> deleteEmployeeDocumentById(HttpServletRequest request, HttpServletResponse response,
      @PathVariable(value = "documentId") Long documentId) {

    employeeDocumentService.removeEmployeeDocumentById(documentId);

    return ResponseEntity.status(HttpStatus.OK).body(documentId);
  }

}
