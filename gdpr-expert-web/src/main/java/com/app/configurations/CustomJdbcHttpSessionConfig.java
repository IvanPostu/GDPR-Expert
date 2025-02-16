package com.app.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;

@Configuration
@EnableJdbcHttpSession
public class CustomJdbcHttpSessionConfig extends AbstractHttpSessionApplicationInitializer {
 
  // @Bean
  // public EmbeddedDatabase dataSource() {
  //   return new EmbeddedDatabaseBuilder()
  //     .setType(EmbeddedDatabaseType.H2)
  //     .addScript("org/springframework/session/jdbc/schema-h2.sql").build();
  // }

  // @Bean
  // public PlatformTransactionManager transactionManager(DataSource dataSource) {
  //   return new DataSourceTransactionManager(dataSource);
  // }
}
