package org.exampleapps.greatbig.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.exampleapps.greatbig.domain.UserCustom;

import org.exampleapps.greatbig.repository.UserCustomRepository;
import org.exampleapps.greatbig.repository.search.UserCustomSearchRepository;
import org.exampleapps.greatbig.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing UserCustom.
 */
@RestController
@RequestMapping("/api")
public class UserCustomResource {

    private final Logger log = LoggerFactory.getLogger(UserCustomResource.class);

    private static final String ENTITY_NAME = "userCustom";

    private final UserCustomRepository userCustomRepository;

    private final UserCustomSearchRepository userCustomSearchRepository;

    public UserCustomResource(UserCustomRepository userCustomRepository, UserCustomSearchRepository userCustomSearchRepository) {
        this.userCustomRepository = userCustomRepository;
        this.userCustomSearchRepository = userCustomSearchRepository;
    }

    /**
     * POST  /user-customs : Create a new userCustom.
     *
     * @param userCustom the userCustom to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userCustom, or with status 400 (Bad Request) if the userCustom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-customs")
    @Timed
    public ResponseEntity<UserCustom> createUserCustom(@RequestBody UserCustom userCustom) throws URISyntaxException {
        log.debug("REST request to save UserCustom : {}", userCustom);
        if (userCustom.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new userCustom cannot already have an ID")).body(null);
        }
        UserCustom result = userCustomRepository.save(userCustom);
        userCustomSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/user-customs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-customs : Updates an existing userCustom.
     *
     * @param userCustom the userCustom to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userCustom,
     * or with status 400 (Bad Request) if the userCustom is not valid,
     * or with status 500 (Internal Server Error) if the userCustom couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-customs")
    @Timed
    public ResponseEntity<UserCustom> updateUserCustom(@RequestBody UserCustom userCustom) throws URISyntaxException {
        log.debug("REST request to update UserCustom : {}", userCustom);
        if (userCustom.getId() == null) {
            return createUserCustom(userCustom);
        }
        UserCustom result = userCustomRepository.save(userCustom);
        userCustomSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userCustom.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-customs : get all the userCustoms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userCustoms in body
     */
    @GetMapping("/user-customs")
    @Timed
    public List<UserCustom> getAllUserCustoms() {
        log.debug("REST request to get all UserCustoms");
        return userCustomRepository.findAll();
    }

    /**
     * GET  /user-customs/:id : get the "id" userCustom.
     *
     * @param id the id of the userCustom to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userCustom, or with status 404 (Not Found)
     */
    @GetMapping("/user-customs/{id}")
    @Timed
    public ResponseEntity<UserCustom> getUserCustom(@PathVariable Long id) {
        log.debug("REST request to get UserCustom : {}", id);
        UserCustom userCustom = userCustomRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userCustom));
    }

    /**
     * DELETE  /user-customs/:id : delete the "id" userCustom.
     *
     * @param id the id of the userCustom to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-customs/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserCustom(@PathVariable Long id) {
        log.debug("REST request to delete UserCustom : {}", id);
        userCustomRepository.delete(id);
        userCustomSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/user-customs?query=:query : search for the userCustom corresponding
     * to the query.
     *
     * @param query the query of the userCustom search
     * @return the result of the search
     */
    @GetMapping("/_search/user-customs")
    @Timed
    public List<UserCustom> searchUserCustoms(@RequestParam String query) {
        log.debug("REST request to search UserCustoms for query {}", query);
        return StreamSupport
            .stream(userCustomSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
