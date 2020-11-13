package com.app.persistence.dao;

import com.app.domain.entities.OrganisationLogoEntity;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class OrganisationLogoDaoImpl implements OrganisationLogoDao {

  private static final Logger logger = LogManager.getLogger();

  private final SessionFactory sessionFactory;

  @Autowired
  public OrganisationLogoDaoImpl (SessionFactory sessionFactory){
    this.sessionFactory = sessionFactory;
  }

  @Override
  public void addOrganisationLogo(OrganisationLogoEntity organisationLogoEntity) {
    Session session = sessionFactory.getCurrentSession();
    session.persist(organisationLogoEntity);
    logger.info("Organisation logo successfully saved.");
  }

  @Override
  public void removeOrganisationLogo(Long organisationLogoId) {
    Session session = sessionFactory.getCurrentSession();
    OrganisationLogoEntity organisationLogo = session.load(
      OrganisationLogoEntity.class, organisationLogoId);
    
    if(organisationLogo!=null){
      session.delete(organisationLogo);
    }

    logger.info("Organisation logo successfully deleted.");

  }
  
}
