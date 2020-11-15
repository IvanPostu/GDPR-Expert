package com.app.persistence.dao;

import com.app.domain.entities.OrganisationLogoEntity;

public interface OrganisationLogoDao {
  

  OrganisationLogoEntity findById(Long organisationLogoEntityId);
  
  void addOrganisationLogo(OrganisationLogoEntity organisationLogoEntity);
  
  void updateOrganisationLogo(OrganisationLogoEntity organisationLogoEntity);

  boolean removeOrganisationLogo(Long organisationLogoId);

}
