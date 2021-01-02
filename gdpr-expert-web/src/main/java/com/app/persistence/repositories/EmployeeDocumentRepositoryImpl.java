package com.app.persistence.repositories;

import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.persistence.Tuple;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import com.app.domain.entities.EmployeeDocumentEntity;
import com.app.domain.entities.EmployeeEntity;


public class EmployeeDocumentRepositoryImpl implements EmployeeDocumentRepository {

  @PersistenceContext
  private EntityManager entityManager;

  @Transactional
  @Override
  public void saveAll(Collection<EmployeeDocumentEntity> documentEntities) {
    Iterator<EmployeeDocumentEntity> iter = documentEntities.iterator();

    while (iter.hasNext()) {
      EmployeeDocumentEntity item = iter.next();
      entityManager.persist(item);
    }

  }

  @Transactional
  @Override
  public void deleteById(Long documentId) {

    EmployeeDocumentEntity documentEntity = entityManager.find(EmployeeDocumentEntity.class, documentId);

    if (documentEntity != null) {
      entityManager.remove(documentEntity);
    } else {
      throw new EntityNotFoundException(String.format("DocumentEntity with id %d not found", documentId));
    }
  }

  @Override
  public Collection<EmployeeDocumentEntity> getEmployeeDocumentsWithoutBlob(Long employeeId) {

    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Tuple> criteriaQuery = criteriaBuilder
      .createTupleQuery();
    Root<EmployeeDocumentEntity> root = criteriaQuery
      .from(EmployeeDocumentEntity.class);

    criteriaQuery.multiselect(
        root.get("employeeDocumentId"),
        root.get("fileName"),
        root.get("uploadedToThePlatformAt")
      ).where(criteriaBuilder
        .equal(root.<EmployeeEntity>get("employee").<Long>get("id"), employeeId)
      );
      
    List<Tuple> tuples = entityManager.createQuery(criteriaQuery)
      .getResultList();
    
    List<EmployeeDocumentEntity> documents = tuples
      .stream()
      .map(tuple -> {
        EmployeeDocumentEntity d = new EmployeeDocumentEntity();
        d.setEmployeeDocumentId(tuple.get(0, Long.class));
        d.setFileName(tuple.get(1, String.class));
        d.setUploadedToThePlatformAt(tuple.get(2, Date.class));
        
        return d;
      })
      .collect(Collectors.toList());

    return documents;
  }

  @Transactional
  @Override
  public Optional<EmployeeDocumentEntity> findById(Long documentId) {

    EmployeeDocumentEntity document = entityManager.find(EmployeeDocumentEntity.class, documentId);

    return Optional.of(document);
  }

  @Override
  public Long count() {
    final String hQuery = "SELECT COUNT(e.id) FROM EmployeeDocumentEntity e";
    Long count = (Long)entityManager.createQuery(hQuery).getSingleResult();

    return count;
  }

  @Override
  public Collection<EmployeeDocumentEntity> getEmployeeDocumentsWithBlob(Long employeeId) {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Tuple> criteriaQuery = criteriaBuilder
      .createTupleQuery();
    Root<EmployeeDocumentEntity> root = criteriaQuery
      .from(EmployeeDocumentEntity.class);

    criteriaQuery.multiselect(
        root.get("employeeDocumentId"),
        root.get("fileName"),
        root.get("uploadedToThePlatformAt"),
        root.get("documentDataBlob")
      ).where(criteriaBuilder
        .equal(root.<EmployeeEntity>get("employee").<Long>get("id"), employeeId)
      );
      
    List<Tuple> tuples = entityManager.createQuery(criteriaQuery)
      .getResultList();
    
    List<EmployeeDocumentEntity> documents = tuples
      .stream()
      .map(tuple -> {
        EmployeeDocumentEntity d = new EmployeeDocumentEntity();
        d.setEmployeeDocumentId(tuple.get(0, Long.class));
        d.setFileName(tuple.get(1, String.class));
        d.setUploadedToThePlatformAt(tuple.get(2, Date.class));
        d.setDocumentDataBlob(tuple.get(3, byte[].class));
        
        return d;
      })
      .collect(Collectors.toList());

    return documents;
  }

}
