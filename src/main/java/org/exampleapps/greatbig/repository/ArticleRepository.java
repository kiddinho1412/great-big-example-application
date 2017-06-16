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
public interface ArticleRepository extends JpaRepository<Article,Long> {

    @Query("select article from Article article where article.author.login = ?#{principal.username}")
    List<Article> findByAuthorIsCurrentUser();

    @Query("select distinct article from Article article left join fetch article.tags")
    List<Article> findAllWithEagerRelationships();

    @Query("select article from Article article left join fetch article.tags where article.id = :id")
    Article findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select article from Article article where article.author.login = :author")
    Page<Article> findByAuthor(@Param("author") String author, Pageable pageable);

    @Query("select article from Article article left join article.tags tags where tags.name = :tag")
    Page<Article>  findByTag(@Param("tag") String tag, Pageable pageable);

    // @PersistenceContext
    // private EntityManager em;

    // @Override
    // @SuppressWarnings("unchecked")
    // public Page<Article> findByTag(String tag, Pageable pageable) {
    //     // using 'join fetch' because a single query should load both owners and pets
    //     // using 'left join fetch' because it might happen that an owner does not have pets yet
    //     Query query = this.em.createQuery("SELECT DISTINCT article FROM Article article left join fetch article.tags tags WHERE tags.name =:tag");
    //     query.setParameter("tag", tag);
    //     return query.getResultList();
    // }




    @Query("select distinct article from Article article left join article.favoriters favoriters where favoriters.id =:id")
    Page<Article>  findByFavoriter(@Param("id") Long id, Pageable pageable);

    @Query("select article from Article article")
    Page<Article>  findAll(Pageable pageable);

}
