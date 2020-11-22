package com.app;

import static org.junit.Assert.assertEquals;

import javax.transaction.Transactional;

import com.app.domain.entities.UserEntity;
import com.app.persistence.repositories.UserRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
  {
    "file:src/main/webapp/WEB-INF/context.xml",
    "file:src/main/webapp/WEB-INF/datasource.xml",
  }
)
@Transactional
public class InMemoryDbTest {

  @Autowired
  private UserRepository userRepository;

  @Test
  public void givenStudent_whenSave_thenGetOk() {
    UserEntity u = userRepository.findById(1L).get();
    assertEquals("john", "john");
  }
}