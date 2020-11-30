package com.app.persistence.repositories;

import org.junit.platform.runner.JUnitPlatform;
import org.junit.platform.suite.api.SelectClasses;
import org.junit.runner.RunWith;

// @ExtendWith(SpringExtension.class)
// @ContextConfiguration({ "file:src/main/webapp/WEB-INF/context.xml", "file:src/test/webapp/WEB-INF/datasource.xml", })
@RunWith(JUnitPlatform.class)
@SelectClasses({ UserRepositoryTest.class, OrganisationRepositoryTest.class})
public class _OrderSutieClass extends _RepositoriesConfiguration {
  
}
