package org.exampleapps.greatbig.repository;

import org.exampleapps.greatbig.domain.UserCustom;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the UserCustom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserCustomRepository extends JpaRepository<UserCustom,Long> {

    @Query("select distinct user_custom from UserCustom user_custom left join fetch user_custom.followers left join fetch user_custom.favorites")
    List<UserCustom> findAllWithEagerRelationships();

    @Query("select user_custom from UserCustom user_custom left join fetch user_custom.followers left join fetch user_custom.favorites where user_custom.id =:id")
    UserCustom findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select user_custom from UserCustom user_custom where user_custom.id =:id")
    UserCustom findById(@Param("id") Long id);

}
