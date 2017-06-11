package org.exampleapps.greatbig.repository;

import org.exampleapps.greatbig.domain.UserCustom;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserCustom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserCustomRepository extends JpaRepository<UserCustom,Long> {

}
