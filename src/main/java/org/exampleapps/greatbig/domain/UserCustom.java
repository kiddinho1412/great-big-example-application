package org.exampleapps.greatbig.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A UserCustom.
 */
@Entity
@Table(name = "user_custom")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "usercustom")
public class UserCustom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Lob
    @Column(name = "bio")
    private String bio;

    @OneToOne
    // @MapsId
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_custom_follower",
               joinColumns = @JoinColumn(name="user_customs_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="followers_id", referencedColumnName="id"))
    private Set<UserCustom> followers = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_custom_favorite",
               joinColumns = @JoinColumn(name="user_customs_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="favorites_id", referencedColumnName="id"))
    private Set<Article> favorites = new HashSet<>();

    @ManyToMany(mappedBy = "followers")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserCustom> followees = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBio() {
        return bio;
    }

    public UserCustom bio(String bio) {
        this.bio = bio;
        return this;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public User getUser() {
        return user;
    }

    public UserCustom user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<UserCustom> getFollowers() {
        return followers;
    }

    public UserCustom followers(Set<UserCustom> userCustoms) {
        this.followers = userCustoms;
        return this;
    }

    public UserCustom addFollower(UserCustom userCustom) {
        this.followers.add(userCustom);
        userCustom.getFollowees().add(this);
        return this;
    }

    public UserCustom removeFollower(UserCustom userCustom) {
        this.followers.remove(userCustom);
        userCustom.getFollowees().remove(this);
        return this;
    }

    public void setFollowers(Set<UserCustom> userCustoms) {
        this.followers = userCustoms;
    }

    public Set<Article> getFavorites() {
        return favorites;
    }

    public UserCustom favorites(Set<Article> articles) {
        this.favorites = articles;
        return this;
    }

    public UserCustom addFavorite(Article article) {
        this.favorites.add(article);
        article.getFavoriters().add(this);
        return this;
    }

    public UserCustom removeFavorite(Article article) {
        this.favorites.remove(article);
        article.getFavoriters().remove(this);
        return this;
    }

    public void setFavorites(Set<Article> articles) {
        this.favorites = articles;
    }

    public Set<UserCustom> getFollowees() {
        return followees;
    }

    public UserCustom followees(Set<UserCustom> userCustoms) {
        this.followees = userCustoms;
        return this;
    }

    public UserCustom addFollowee(UserCustom userCustom) {
        this.followees.add(userCustom);
        userCustom.getFollowers().add(this);
        return this;
    }

    public UserCustom removeFollowee(UserCustom userCustom) {
        this.followees.remove(userCustom);
        userCustom.getFollowers().remove(this);
        return this;
    }

    public void setFollowees(Set<UserCustom> userCustoms) {
        this.followees = userCustoms;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserCustom userCustom = (UserCustom) o;
        if (userCustom.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userCustom.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserCustom{" +
            "id=" + getId() +
            ", bio='" + getBio() + "'" +
            "}";
    }
}
