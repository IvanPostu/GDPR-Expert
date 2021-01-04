package com.app.persistence.repositories;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import com.app.domain.entities.AuthUserEntity;
import com.app.domain.entities.OrganisationEntity;
import com.app.domain.entities.OrganisationLogoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.query.QueryUtils;

public class OrganisationRepositoryImpl implements OrganisationRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public List<OrganisationEntity> findAllByOwnerId(Long userOwnerId) {
    AuthUserEntity u = entityManager.find(AuthUserEntity.class, userOwnerId);
    List<OrganisationEntity> organisations = u
      .getOrganisations()
      .stream()
      .collect(Collectors.toList());

    return organisations;
  }

  @Override
  public Optional<OrganisationEntity> findOrganisationByIdAndOwnerId(Long organisationId, Long userOwnerId) {
    OrganisationEntity organisation = entityManager.find(OrganisationEntity.class, organisationId);

    if (organisation != null && organisation.getOwner().getId().equals(userOwnerId)) {
      return Optional.of(organisation);
    }

    return Optional.ofNullable(null);
  }

  @Transactional
  @Override
  public void deleteById(Long organisationId) {
    
    final String hQuery = "DELETE FROM OrganisationEntity u WHERE u.id=:paramId";
    entityManager
      .createQuery(hQuery)
      .setParameter("paramId", organisationId)
      .executeUpdate();

  }

  @Transactional
  @Override
  public void save(OrganisationEntity organisationEntity) {
    entityManager.persist(organisationEntity);
    OrganisationLogoEntity logo = organisationEntity.getOrganisationLogoEntity();
    /**
     * OneToOne using shared primary key
     */
    if(logo == null){
      logo = new OrganisationLogoEntity();
      organisationEntity.setOrganisationLogoEntity(logo);
    }

    
    logo.setId(organisationEntity.getId());
    logo.setOrganisation(organisationEntity);

    entityManager.persist(logo);
  }

  @Override
  public Optional<OrganisationEntity> findById(Long organisationId) {
    OrganisationEntity organisation = entityManager.find(OrganisationEntity.class, organisationId);
    return Optional.of(organisation);
  }

  @Override
  public Page<OrganisationEntity> findAll(Pageable pageable) {


    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<OrganisationEntity> cq = cb.createQuery(OrganisationEntity.class);

    Root<OrganisationEntity> root = cq.from(OrganisationEntity.class);
    cq.orderBy(QueryUtils.toOrders(pageable.getSort(), root, cb));
    
    TypedQuery<OrganisationEntity> query = entityManager.createQuery(cq);

    int pageNumber =pageable.getPageNumber();
    int pageSize = pageable.getPageSize();

    query.setFirstResult((pageNumber) * pageSize);
    query.setMaxResults(pageSize);

    List <OrganisationEntity> list = query.getResultList();

    Query queryTotal = entityManager.createQuery("SELECT COUNT(o.id) FROM OrganisationEntity o");
    long countResult = (long)queryTotal.getSingleResult();
    int i=(int)countResult;

    PageImpl<OrganisationEntity> p = new PageImpl<OrganisationEntity>(list, pageable, i);
    
    return p;
  }

}
