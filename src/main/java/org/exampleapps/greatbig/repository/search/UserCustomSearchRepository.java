package org.exampleapps.greatbig.repository.search;

import org.exampleapps.greatbig.domain.UserCustom;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UserCustom entity.
 */
public interface UserCustomSearchRepository extends ElasticsearchRepository<UserCustom, Long> {
}
