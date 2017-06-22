package org.exampleapps.greatbig.service;

import org.exampleapps.greatbig.domain.User;
import org.exampleapps.greatbig.domain.Author;
import org.exampleapps.greatbig.repository.AuthorityRepository;
import org.exampleapps.greatbig.repository.UserRepository;
import org.exampleapps.greatbig.repository.AuthorRepository;
import org.exampleapps.greatbig.security.SecurityUtils;
import org.exampleapps.greatbig.service.dto.UserDTO;
import org.exampleapps.greatbig.service.dto.ProfileDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class ProfileService {

  private final Logger log = LoggerFactory.getLogger(ProfileService.class);

  private final UserRepository userRepository;
  private final AuthorRepository authorRepository;

  private final AuthorityRepository authorityRepository;

  public ProfileService(UserRepository userRepository, AuthorRepository authorRepository,
      AuthorityRepository authorityRepository) {
    this.userRepository = userRepository;
    this.authorRepository = authorRepository;
    this.authorityRepository = authorityRepository;
  }

  /**
   * Get the profile for a user
   *
   * @param login login
   */
  // @Transactional(readOnly = true)
  public Optional<ProfileDTO> findOneByLogin(String login) {
    ProfileDTO profile = new ProfileDTO();
    Optional<User> subjectUser = userRepository.findOneByLogin(login);
    if (subjectUser.isPresent()) {
      Author subjectAuthor = this.getAuthor(subjectUser.get().getId());
      profile.setUsername(subjectUser.get().getLogin());
      profile.setBio(subjectAuthor.getBio());
      profile.setImage(subjectUser.get().getImageUrl());
      profile.setFollowing(isFollowing(subjectAuthor));
      log.debug("Got profile for user: ", login);
    }
    return Optional.of(profile);
  }

  // @Transactional(readOnly = true)
  /**
   * Follow a user
   *
   * @param login login
   */
  public Optional<ProfileDTO> followUser(String login) {
    ProfileDTO profile = new ProfileDTO();
    Optional<User> currentUser = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin());
    if (currentUser.isPresent()) {
      Optional<User> subjectUser = userRepository.findOneByLogin(login);
      if (subjectUser.isPresent()) {
        Author currentAuthor = this.getAuthor(currentUser.get().getId());
        Author subjectAuthor = this.getAuthor(subjectUser.get().getId());
        currentAuthor.addFollowee(subjectAuthor);
        profile.setUsername(subjectUser.get().getLogin());
        profile.setBio(subjectAuthor.getBio());
        profile.setImage(subjectUser.get().getImageUrl());
        profile.setFollowing(isFollowing(subjectAuthor));
        log.debug("Followed user: ", login);
      }
    }
    return Optional.of(profile);
  }

  // @Transactional(readOnly = true)
  /**
   * Unfollow a user
   *
   * @param login login
   */
  public Optional<ProfileDTO> unfollowUser(String login) {
    ProfileDTO profile = new ProfileDTO();
    Optional<User> currentUser = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin());
    if (currentUser.isPresent()) {
      Optional<User> subjectUser = userRepository.findOneByLogin(login);
      if (subjectUser.isPresent()) {
        Author currentAuthor = this.getAuthor(currentUser.get().getId());
        Author subjectAuthor = this.getAuthor(subjectUser.get().getId());
        currentAuthor.removeFollowee(subjectAuthor);
        profile.setUsername(subjectUser.get().getLogin());
        profile.setBio(subjectAuthor.getBio());
        profile.setImage(subjectUser.get().getImageUrl());
        profile.setFollowing(isFollowing(subjectAuthor));
        log.debug("Unfollowed user: ", login);
      }
    }
    return Optional.of(profile);
  }

  @Transactional(readOnly = true)
  public Author getAuthor(Long id) {
    return authorRepository.findById(id);
  }

  private Boolean isFollowing(Author subjectAuthor) {
    Boolean following = false;
    Optional<User> currentUser = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin());
    if (currentUser.isPresent()) {
      Author currentAuthor = this.getAuthor(currentUser.get().getId());
      following = currentAuthor.getFollowees().contains(subjectAuthor);
    }
    return following;
  }
}
