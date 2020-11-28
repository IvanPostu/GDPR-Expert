package com.app.persistence.repositories;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.platform.suite.api.SelectClasses;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ContextConfiguration({ "file:src/main/webapp/WEB-INF/context.xml", "file:src/test/webapp/WEB-INF/datasource.xml", })
@RunWith(JUnitPlatform.class)
@SelectClasses({ OrganisationRepositoryTest.class, UserRepositoryTest.class})
public class _OrderSutieClass {
  
}
