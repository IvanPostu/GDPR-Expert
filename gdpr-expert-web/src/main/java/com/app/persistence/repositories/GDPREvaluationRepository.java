package com.app.persistence.repositories;

import java.util.Optional;

import com.app.domain.entities.GDPREvaluationEntity;
import org.springframework.data.repository.Repository;

public interface GDPREvaluationRepository extends Repository<GDPREvaluationEntity, Long> {
  
  void save(GDPREvaluationEntity e);

  Optional<GDPREvaluationEntity> findById(Long id);

  void removeById(Long GDPREvaluationEntityId);

  Long count();

}
