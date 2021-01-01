package com.app.persistence.repositories;

import org.junit.jupiter.api.Tag;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.platform.suite.api.SelectClasses;
import org.junit.runner.RunWith;


@RunWith(JUnitPlatform.class)
@SelectClasses({ 
  UserRoleRepositoryTest.class,
  UserRepositoryTest.class,
  OrganisationRepositoryTest.class, 
  DepartmentRepositoryTest.class, 
  EmployeeRepositoryTest.class,
  DataProcessingActivityRepositoryTest.class,
  SeverityEvaluatingOfPersonalDataRepositoryTest.class
})
@Tag(value = "slow")
public class _OrderSutieClass extends _RepositoriesConfiguration {}
