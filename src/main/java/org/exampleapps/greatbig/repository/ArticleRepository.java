package org.exampleapps.greatbig.repository;

import org.exampleapps.greatbig.domain.Article;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;
import javax.persistence.EntityManager;

/**
 * Spring Data JPA repository for the Article entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    // Since moving the relationship from User to Author (with no login field) this doesn't work.
    // Luckily it isn't needed yet.
    // @Query("select article from Article article where article.author.login = ?#{principal.username}")
    // List<Article> findByAuthorIsCurrentUser();

    @Query("select distinct article from Article article left join fetch article.tags")
    List<Article> findAllWithEagerRelationships();

    @Query("select article from Article article left join fetch article.tags where article.id = :id")
    Article findOneWithEagerRelationships(@Param("id") Long id);

    // @Query("select article from Article article where article.author.login = :author")
    // Page<Article> findByAuthor(@Param("author") String author, Pageable pageable);
    @Query("select new org.exampleapps.greatbig.service.dto.ArticleDTO("
        + "a.slug,"
        + "a.title,"
        + "a.description,"
        + "a.body,"
        + "null,"
        // + "a.tagList,"
        + "a.createdAt,"
        + "a.updatedAt,"
        + "false,"
        // + "a.favorited,"
        + "0,"
        // + "a.favoritesCount,"
        + "null)"
        + "from Article a inner join a.author author inner join author.user where user.login = :author")
    Page<Article> findByAuthor(@Param("author") String author, Pageable pageable);

    // @Query("select article from Article article left join article.tags tags where tags.name = :tag")
    @Query("select new org.exampleapps.greatbig.service.dto.ArticleDTO("
        + "a.slug,"
        + "a.title,"
        + "a.description,"
        + "a.body,"
        + "null,"
        // + "a.tagList,"
        + "a.createdAt,"
        + "a.updatedAt,"
        + "false,"
        // + "a.favorited,"
        + "0,"
        // + "a.favoritesCount,"
        // + "new org.exampleapps.greatbig.service.dto.ProfileDTO("
        // + "user.login,"
        // + "author.bio,"
        // + "user.image,"
        // + "false))"
        + "null)"
        + "from Article a inner join a.author author inner join a.tags inner join author.user user where tags.name = :tag")
    Page<Article> findByTag(@Param("tag") String tag, Pageable pageable);

    @Query("select distinct article from Article article left join article.favoriters favoriters where favoriters.id =:id")
    Page<Article> findByFavoriter(@Param("id") Long id, Pageable pageable);

    @Query("select article from Article article")
    Page<Article> findAll(Pageable pageable);

}
