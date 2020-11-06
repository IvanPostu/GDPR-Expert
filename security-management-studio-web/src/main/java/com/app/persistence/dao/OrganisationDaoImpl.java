package com.app.persistence.dao;

import com.app.domain.entities.OrganisationEntity;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class OrganisationDaoImpl implements OrganisationDao {

  private static final Logger logger = LogManager.getLogger();

  private final SessionFactory sessionFactory;

  @Autowired
  public OrganisationDaoImpl (SessionFactory sessionFactory){
    this.sessionFactory = sessionFactory;
  }

  @Override
  public void addOrganisation(OrganisationEntity oEntity) {
    Session session = sessionFactory.getCurrentSession();
    session.persist(oEntity);
    logger.info("Organisation successfully saved. Organisation info " + oEntity.toString());
  }
}
