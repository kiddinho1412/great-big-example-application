package org.exampleapps.greatbig.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Profile.
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "profile")
public class Profile implements Serializable {

    @Id
    @Column(name = "username")
    private String username;

    @Lob
    @Column(name = "bio")
    private String bio;

    @Column(name = "image")
    private String image;

    @Column(name = "following")
    private Boolean following;

    // public Long getId() {
    //     return id;
    // }

    // public void setId(Long id) {
    //     this.id = id;
    // }

    public String getUsername() {
        return username;
    }

    public Profile username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBio() {
        return bio;
    }

    public Profile bio(String bio) {
        this.bio = bio;
        return this;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getImage() {
        return image;
    }

    public Profile image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean isFollowing() {
        return following;
    }

    public Profile following(Boolean following) {
        this.following = following;
        return this;
    }

    public void setFollowing(Boolean following) {
        this.following = following;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Profile profile = (Profile) o;
        if (profile.getUsername() == null || getUsername() == null) {
            return false;
        }
        return Objects.equals(getUsername(), profile.getUsername());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getUsername());
    }

    @Override
    public String toString() {
        return "Profile{" + ", username='" + getUsername() + "'" + ", bio='" + getBio() + "'" + ", image='" + getImage()
                + "'" + ", following='" + isFollowing() + "'" + "}";
    }
}
