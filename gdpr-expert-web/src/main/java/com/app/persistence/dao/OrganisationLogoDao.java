package com.app.persistence.dao;

import com.app.domain.entities.OrganisationLogoEntity;

public interface OrganisationLogoDao {
  

  void addOrganisationLogo(OrganisationLogoEntity organisationLogoEntity);

  void removeOrganisationLogo(Long organisationLogoId);

}
