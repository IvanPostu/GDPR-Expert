package com.app.persistence.repositories;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ContextHierarchy({
  @ContextConfiguration("file:src/main/webapp/WEB-INF/context.xml"),
  @ContextConfiguration("file:src/test/webapp/WEB-INF/datasource.xml")
})
public class _RepositoriesConfiguration {
  
}
