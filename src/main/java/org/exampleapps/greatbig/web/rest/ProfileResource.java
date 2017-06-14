package org.exampleapps.greatbig.web.rest;

import com.codahale.metrics.annotation.Timed;

import org.exampleapps.greatbig.web.rest.util.HeaderUtil;
import org.exampleapps.greatbig.service.ProfileService;
import org.exampleapps.greatbig.service.dto.ProfileDTO;
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
 * REST controller for managing Profile.
 */
@RestController
@RequestMapping("/api")
public class ProfileResource {

    private final Logger log = LoggerFactory.getLogger(ProfileResource.class);

    private static final String ENTITY_NAME = "profile";

    private final ProfileService profileService;

    public ProfileResource(ProfileService profileService) {
        this.profileService = profileService;
    }

    /**
     * GET  /profiles/:username : get the "username" profile.
     *
     * @param username the username of the profile to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the profile, or with status 404 (Not Found)
     */
    @GetMapping("/profiles/{username}")
    @Timed
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable String username) {
        log.debug("REST request to get Profile : {}", username);
        return ResponseUtil.wrapOrNotFound(profileService.findOneByLogin(username));
    }

    /**
     * POST  /profiles/{username}/follow : follow the "username" profile.
     *
     * @param username the user to follow
     * @return the ResponseEntity with status 200 (OK) and with body the profile
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/profiles/{username}/follow")
    @Timed
    public ResponseEntity<ProfileDTO> followUser(@PathVariable String username) throws URISyntaxException {
        log.debug("REST request to follow user : {}", username);
        // Optional<ProfileDTO> result = profileService.followUser(username);
        return ResponseUtil.wrapOrNotFound(profileService.followUser(username));
    }

    /**
     * DELETE  /profiles/:username : unfollow the "username" profile.
     *
     * @param username the username of the profile to unfollow
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/profiles/{username}/follow")
    @Timed
    public ResponseEntity<ProfileDTO> unfollowUser(@PathVariable String username) throws URISyntaxException {
        log.debug("REST request to unfollow User : {}", username);
        Optional<ProfileDTO> result = profileService.unfollowUser(username);
        return ResponseUtil.wrapOrNotFound(result);
    }
}
