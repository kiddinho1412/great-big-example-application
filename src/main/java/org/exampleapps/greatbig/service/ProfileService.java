package org.exampleapps.greatbig.service;

import org.exampleapps.greatbig.domain.Authority;
import org.exampleapps.greatbig.domain.Profile;
import org.exampleapps.greatbig.domain.User;
import org.exampleapps.greatbig.domain.UserCustom;
import org.exampleapps.greatbig.repository.AuthorityRepository;
import org.exampleapps.greatbig.config.Constants;
import org.exampleapps.greatbig.repository.UserRepository;
import org.exampleapps.greatbig.repository.UserCustomRepository;
// import org.exampleapps.greatbig.repository.search.UserSearchRepository;
import org.exampleapps.greatbig.security.AuthoritiesConstants;
import org.exampleapps.greatbig.security.SecurityUtils;
import org.exampleapps.greatbig.service.util.RandomUtil;
import org.exampleapps.greatbig.service.dto.UserDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class ProfileService {

    private final Logger log = LoggerFactory.getLogger(ProfileService.class);

    private final UserRepository userRepository;
    private final UserCustomRepository userCustomRepository;

    private final AuthorityRepository authorityRepository;

    public ProfileService(UserRepository userRepository, UserCustomRepository userCustomRepository,
            AuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.userCustomRepository = userCustomRepository;
        // this.userSearchRepository = userSearchRepository;
        this.authorityRepository = authorityRepository;
    }

    /**
     * Get the profile for a user
     *
     * @param login login
     */
    @Transactional(readOnly = true)
    public Optional<Profile> findOneByLogin(String login) {
        return userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).map(currentUser -> {
            return userRepository.findOneByLogin(login).map(subjectUser -> {
                UserCustom currentUserCustom = currentUser.getUserCustom();
                UserCustom subjectUserCustom = subjectUser.getUserCustom();
                Boolean following = currentUserCustom.getFollowees().contains(subjectUserCustom);
                Profile profile = new Profile();
                profile.setUsername(subjectUser.getLogin());
                profile.setBio(subjectUserCustom.getBio());
                profile.setImage(subjectUser.getImageUrl());
                profile.setFollowing(following);
                log.debug("Got profile for user: ", login);
                return profile;
            });
        });
    }

    @Transactional(readOnly = true)
    /**
     * Follow a user
     *
     * @param login login
     */
    public Profile followUser(String login) {
        return userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).map(currentUser -> {
            return userRepository.findOneByLogin(login).map(subjectUser -> {
                UserCustom currentUserCustom = currentUser.getUserCustom();
                UserCustom subjectUserCustom = subjectUser.getUserCustom();
                currentUserCustom.addFollowee(subjectUserCustom);
                Profile profile = new Profile();
                profile.setUsername(subjectUser.getLogin());
                profile.setBio(subjectUserCustom.getBio());
                profile.setImage(subjectUser.getImageUrl());
                profile.setFollowing(true);
                log.debug("Followed user: ", login);
                return profile;
            });
        });
    }

    @Transactional(readOnly = true)
    /**
     * Unfollow a user
     *
     * @param login login
     */
    public Profile unfollowUser(String login) {
        return userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).map(currentUser -> {
            return userRepository.findOneByLogin(login).map(subjectUser -> {
                UserCustom currentUserCustom = currentUser.getUserCustom();
                UserCustom subjectUserCustom = subjectUser.getUserCustom();
                currentUserCustom.removeFollowee(subjectUserCustom);
                Profile profile = new Profile();
                profile.setUsername(subjectUser.getLogin());
                profile.setBio(subjectUserCustom.getBio());
                profile.setImage(subjectUser.getImageUrl());
                profile.setFollowing(false);
                log.debug("Unfollowed user: ", login);
                return profile;
            });
        });
    }
}
