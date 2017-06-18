package org.exampleapps.greatbig.service.dto;

import org.exampleapps.greatbig.service.dto.ProfileDTO;
import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;
import javax.persistence.Lob;

/**
 * A DTO for the Comment entity.
 *
 * "comment": {
 *   "id": 1,
 *   "createdAt": "2016-02-18T03:22:56.637Z",
 *   "updatedAt": "2016-02-18T03:22:56.637Z",
 *   "body": "It takes a Jacobian",
 *   "author": {
 *     "username": "jake",
 *     "bio": "I work at statefarm",
 *     "image": "https://i.stack.imgur.com/xHWG8.jpg",
 *     "following": false
 *   }
 * }
 *}
 */
public class CommentDTO implements Serializable {

    private Long id;

    private ZonedDateTime createdAt;

    private ZonedDateTime updatedAt;

    @Lob
    private String body;

    private ProfileDTO author;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getBody() {
        return body;
    }

    public void setAuthor(ProfileDTO author) {
        this.author = author;
    }

    public ProfileDTO getAuthor() {
        return author;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CommentDTO commentDTO = (CommentDTO) o;
        if(commentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "comment: {" +
            "id=" + getId() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", body='" + getBody() + "'" +
            ", author='" + getAuthor().toString() + "'" +
            "}";
    }
}
