package com.app.persistence.repositories;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.RequestForPersonalInfoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.query.QueryUtils;

public class RequestForPersonalInfoRepositoryImpl implements RequestForPersonalInfoRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Transactional
  @Override
  public void save(RequestForPersonalInfoEntity requestForPersonalInfoEntity) {
    entityManager.persist(requestForPersonalInfoEntity);
  }

 

  @Override
  public Page<RequestForPersonalInfoEntity> getAllRequestsForUserOrganisations(Long userId, Pageable pageable) {

    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<RequestForPersonalInfoEntity> searchQuery = cb
      .createQuery(RequestForPersonalInfoEntity.class);
    Root<RequestForPersonalInfoEntity> root = searchQuery
      .from(RequestForPersonalInfoEntity.class);
    Join<RequestForPersonalInfoEntity, OrganisationEntity> join= root
      .join("organisation", JoinType.INNER); 
   
    searchQuery.orderBy(QueryUtils.toOrders(pageable.getSort(), root, cb));

    // https://stackoverflow.com/questions/26905047/condition-left-join-in-criteriaquery
    join.on(cb.equal(join.get("owner").get("id"), cb.parameter(Long.class, "usrId"))) ; 


    int pageNumber =    pageable.getPageNumber();
    int pageSize   =    pageable.getPageSize();

    TypedQuery<RequestForPersonalInfoEntity> query = entityManager.createQuery(searchQuery);

    query.setFirstResult((pageNumber) * pageSize);
    query.setMaxResults(pageSize);


    List<RequestForPersonalInfoEntity> list = query
      .setParameter("usrId", userId)
      .getResultList();

    final String queryTotalHibernateQuery = "SELECT COUNT(r.id) "
      + "FROM RequestForPersonalInfoEntity r "
      + "INNER JOIN OrganisationEntity o ON o.id=r.organisation.id  " 
      + "WHERE o.owner.id=:usrId";

    Query queryTotal = entityManager
      .createQuery(queryTotalHibernateQuery)
      .setParameter("usrId", userId);
    long countResult = (long)queryTotal.getSingleResult();

    PageImpl<RequestForPersonalInfoEntity> pageResult = new PageImpl<RequestForPersonalInfoEntity>(list, pageable, countResult);

    return pageResult;
  }

  @Override
  public RequestForPersonalInfoEntity getRequestForPersonalInfoById(Long requestForPersonalInfoId) {
    
    RequestForPersonalInfoEntity entity = entityManager
      .find(RequestForPersonalInfoEntity.class, requestForPersonalInfoId);
    
    return entity;
  }

  @Transactional
  @Override
  public void removeById(Long requestForPersonalInfoId) {
    final String hQuery = "DELETE FROM RequestForPersonalInfoEntity r WHERE r.id=:paramId";
    entityManager
      .createQuery(hQuery)
      .setParameter("paramId", requestForPersonalInfoId)
      .executeUpdate();
  }

  @Override
  public Long count() {
    final String hQuery = "SELECT COUNT(u.id) FROM RequestForPersonalInfoEntity u";
    Long count = (Long)entityManager.createQuery(hQuery).getSingleResult();
  
    return count;
  }
  
}
