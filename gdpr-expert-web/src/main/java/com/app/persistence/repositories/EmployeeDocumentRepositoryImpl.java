package com.app.persistence.repositories;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.app.domain.entities.EmployeeDocumentEntity;

public class EmployeeDocumentRepositoryImpl implements EmployeeDocumentRepository {

  // private final EntityManagerFactory entityManagerFactory;
  @PersistenceContext
  private EntityManager em;

  @Transactional
  @Override
  public void saveAll(Collection<EmployeeDocumentEntity> documentEntities) {
    Iterator<EmployeeDocumentEntity> iter = documentEntities.iterator();

    while (iter.hasNext()) {
      EmployeeDocumentEntity item = iter.next();
      em.persist(item);
      em.flush();
      em.clear();
    }

  }

  @Transactional
  @Override
  public void deleteById(Long documentId) {

    EmployeeDocumentEntity documentEntity = em.find(EmployeeDocumentEntity.class, documentId);

    if (documentEntity != null) {
      em.remove(documentEntity);
    } else {
      throw new EntityNotFoundException(String.format("DocumentEntity with id %d not found", documentId));
    }
  }

  @Override
  public Collection<EmployeeDocumentEntity> getEmployeeDocuments(Long employeeId) {

    List<EmployeeDocumentEntity> documents = em
        .createQuery("SELECT new com.app.domain.entities.EmployeeDocumentEntity( "
            + " e.employeeDocumentId, e.employeeId, e.fileName," + " e.uploadedToThePlatformAt) "
            + " FROM EmployeeDocumentEntity e WHERE e.employeeId = :eId", EmployeeDocumentEntity.class)
        .setParameter("eId", employeeId).getResultList();

    return documents;
  }

  @Transactional
  @Override
  public Optional<EmployeeDocumentEntity> findById(Long documentId) {

    EmployeeDocumentEntity document = em.find(EmployeeDocumentEntity.class, documentId);

    return Optional.of(document);
  }

}
