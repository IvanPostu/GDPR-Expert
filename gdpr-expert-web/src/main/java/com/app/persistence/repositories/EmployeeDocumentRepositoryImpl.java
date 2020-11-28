package com.app.persistence.repositories;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;


import com.app.domain.entities.EmployeeDocumentEntity;

import org.springframework.beans.factory.annotation.Autowired;

public class EmployeeDocumentRepositoryImpl implements EmployeeDocumentRepository {

  private final EntityManagerFactory entityManagerFactory;

  @Autowired
  public EmployeeDocumentRepositoryImpl(EntityManagerFactory entityManagerFactory) {
    this.entityManagerFactory = entityManagerFactory;
  }

  @Override
  public void saveAll(Collection<EmployeeDocumentEntity> documentEntities) {
    Iterator<EmployeeDocumentEntity> iter = documentEntities.iterator();
    EntityManager em = entityManagerFactory.createEntityManager();

    em.getTransaction().begin();

    while (iter.hasNext()) {
      EmployeeDocumentEntity item = iter.next();
      em.persist(item);
      em.flush();
      em.clear();
    }

    em.getTransaction().commit();
  }

  @Override
  public void deleteById(Long documentId) {
    EntityManager em = entityManagerFactory.createEntityManager();

    em.getTransaction().begin();
    EmployeeDocumentEntity documentEntity = em.find(EmployeeDocumentEntity.class, documentId);

    if (documentEntity != null) {
      em.remove(documentEntity);
    }

    em.getTransaction().commit();
    em.close();

  }

  @Override
  public Collection<EmployeeDocumentEntity> getEmployeeDocuments(Long employeeId) {
    EntityManager em = entityManagerFactory.createEntityManager();

    em.getTransaction().begin();

    List<EmployeeDocumentEntity> documents = em
        .createQuery("SELECT new com.app.domain.entities.EmployeeDocumentEntity( "
            + " e.employeeDocumentId, e.employeeId, e.fileName," + " e.uploadedToThePlatformAt) "
            + " FROM EmployeeDocumentEntity e WHERE e.employeeId = :eId", EmployeeDocumentEntity.class)
        .setParameter("eId", employeeId).getResultList();

    em.getTransaction().commit();
    em.close();

    return documents;
  }

  @Override
  public Optional<EmployeeDocumentEntity> findById(Long documentId) {
    
    EntityManager em = entityManagerFactory.createEntityManager();

    em.getTransaction().begin();

    EmployeeDocumentEntity document = em.find(EmployeeDocumentEntity.class, documentId);

    em.getTransaction().commit();
    em.close();

    return Optional.of(document);
  }

  
}
