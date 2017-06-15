package org.exampleapps.greatbig.repository;

import org.exampleapps.greatbig.domain.Article;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Article entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleRepository extends JpaRepository<Article,Long> {

    @Query("select article from Article article where article.author.login = ?#{principal.username}")
    List<Article> findByAuthorIsCurrentUser();

    @Query("select distinct article from Article article left join fetch article.tags")
    List<Article> findAllWithEagerRelationships();

    @Query("select article from Article article left join fetch article.tags where article.id =:id")
    Article findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select article from Article article where article.author.login = :author")
    List<Article> findByAuthor(@Param("author") String author);

    @Query("select article from Article article left join fetch article.tags tags where tags.name =:tag")
    List<Article>  findByTag(@Param("tag") String tag);

    @Query("select article from Article article left join fetch article.favorites where article.id =:id")
    List<Article>  findByFavorited(@Param("favoriter") String favoriter);

}
