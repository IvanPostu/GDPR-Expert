package com.app.persistence.dao;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.TypedQuery;

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

  @SuppressWarnings("unchecked")
  @Override
  public Set<OrganisationEntity> findOrganisationsByOwnerId(Long userOwnerId) {
    Session session = sessionFactory.getCurrentSession();
    final String sqlStr = "FROM OrganisationEntity WHERE user_owner_id=:ownerId"; 

    TypedQuery<OrganisationEntity> query = session.createQuery(sqlStr);
    query.setParameter("ownerId", userOwnerId);

    Set<OrganisationEntity> organisations = new HashSet<>(query.getResultList());

    return organisations;
  }

  @SuppressWarnings("unchecked")
  @Override
  public OrganisationEntity findOrganisationByIdAndOwnerId(Long organisationId, Long ownerId) {
    Session session = sessionFactory.getCurrentSession();
    final String sqlStr = "FROM OrganisationEntity WHERE organisation_id=:orgId "+
      " AND user_owner_id=:ownerId"; 

    TypedQuery<OrganisationEntity> query = session.createQuery(sqlStr);
    query.setParameter("ownerId", ownerId);
    query.setParameter("orgId", organisationId);

    OrganisationEntity organisation = query.getSingleResult();
    return organisation;
  }

 
}
