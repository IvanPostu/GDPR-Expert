package com.app.persistence.repositories;

import org.junit.platform.runner.JUnitPlatform;
import org.junit.platform.suite.api.SelectClasses;
import org.junit.runner.RunWith;


@RunWith(JUnitPlatform.class)
@SelectClasses({ 
  UserRoleRepositoryTest.class,
  UserRepositoryTest.class,
  SeverityEvaluatingOfPersonalDataRepositoryTest.class,
  RequestForPersonalInfoRepositoryTest.class,
  OrganisationRepositoryTest.class, 
  GDPREvaluationRepositoryTest.class,
  EmployeeRepositoryTest.class,
  EmployeeDocumentRepositoryTest.class,
  DepartmentRepositoryTest.class, 
  DataProtectionImpactAssessmentRepositoryTest.class,
  DataProcessingActivityRepositoryTest.class,
})
public class _OrderSutieClass extends _RepositoriesConfiguration {}
