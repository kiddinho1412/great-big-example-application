package org.exampleapps.greatbig.web.rest;

import org.exampleapps.greatbig.GreatBigExampleApplicationApp;

import org.exampleapps.greatbig.domain.Author;
import org.exampleapps.greatbig.repository.AuthorRepository;
import org.exampleapps.greatbig.repository.search.AuthorSearchRepository;
import org.exampleapps.greatbig.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AuthorResource REST controller.
 *
 * @see AuthorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreatBigExampleApplicationApp.class)
public class AuthorResourceIntTest {

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_BIO = "AAAAAAAAAA";
    private static final String UPDATED_BIO = "BBBBBBBBBB";

    @Autowired
    private AuthorRepository userCustomRepository;

    @Autowired
    private AuthorSearchRepository userCustomSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAuthorMockMvc;

    private Author author;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AuthorResource userCustomResource = new AuthorResource(userCustomRepository, userCustomSearchRepository);
        this.restAuthorMockMvc = MockMvcBuilders.standaloneSetup(userCustomResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Author createEntity(EntityManager em) {
        Author author = new Author()
            .login(DEFAULT_LOGIN)
            .bio(DEFAULT_BIO);
        return author;
    }

    @Before
    public void initTest() {
        userCustomSearchRepository.deleteAll();
        author = createEntity(em);
    }

    @Test
    @Transactional
    public void createAuthor() throws Exception {
        int databaseSizeBeforeCreate = userCustomRepository.findAll().size();

        // Create the Author
        restAuthorMockMvc.perform(post("/api/authors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(author)))
            .andExpect(status().isCreated());

        // Validate the Author in the database
        List<Author> userCustomList = userCustomRepository.findAll();
        assertThat(userCustomList).hasSize(databaseSizeBeforeCreate + 1);
        Author testAuthor = userCustomList.get(userCustomList.size() - 1);
        assertThat(testAuthor.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testAuthor.getBio()).isEqualTo(DEFAULT_BIO);

        // Validate the Author in Elasticsearch
        Author userCustomEs = userCustomSearchRepository.findOne(testAuthor.getId());
        assertThat(userCustomEs).isEqualToComparingFieldByField(testAuthor);
    }

    @Test
    @Transactional
    public void createAuthorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userCustomRepository.findAll().size();

        // Create the Author with an existing ID
        author.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuthorMockMvc.perform(post("/api/authors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(author)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Author> userCustomList = userCustomRepository.findAll();
        assertThat(userCustomList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAuthors() throws Exception {
        // Initialize the database
        userCustomRepository.saveAndFlush(author);

        // Get all the userCustomList
        restAuthorMockMvc.perform(get("/api/authors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(author.getId().intValue())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].bio").value(hasItem(DEFAULT_BIO.toString())));
    }

    @Test
    @Transactional
    public void getAuthor() throws Exception {
        // Initialize the database
        userCustomRepository.saveAndFlush(author);

        // Get the author
        restAuthorMockMvc.perform(get("/api/authors/{id}", author.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(author.getId().intValue()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN.toString()))
            .andExpect(jsonPath("$.bio").value(DEFAULT_BIO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAuthor() throws Exception {
        // Get the author
        restAuthorMockMvc.perform(get("/api/authors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAuthor() throws Exception {
        // Initialize the database
        userCustomRepository.saveAndFlush(author);
        userCustomSearchRepository.save(author);
        int databaseSizeBeforeUpdate = userCustomRepository.findAll().size();

        // Update the author
        Author updatedAuthor = userCustomRepository.findOne(author.getId());
        updatedAuthor
            .login(UPDATED_LOGIN)
            .bio(UPDATED_BIO);

        restAuthorMockMvc.perform(put("/api/authors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAuthor)))
            .andExpect(status().isOk());

        // Validate the Author in the database
        List<Author> userCustomList = userCustomRepository.findAll();
        assertThat(userCustomList).hasSize(databaseSizeBeforeUpdate);
        Author testAuthor = userCustomList.get(userCustomList.size() - 1);
        assertThat(testAuthor.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testAuthor.getBio()).isEqualTo(UPDATED_BIO);

        // Validate the Author in Elasticsearch
        Author userCustomEs = userCustomSearchRepository.findOne(testAuthor.getId());
        assertThat(userCustomEs).isEqualToComparingFieldByField(testAuthor);
    }

    @Test
    @Transactional
    public void updateNonExistingAuthor() throws Exception {
        int databaseSizeBeforeUpdate = userCustomRepository.findAll().size();

        // Create the Author

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAuthorMockMvc.perform(put("/api/authors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(author)))
            .andExpect(status().isCreated());

        // Validate the Author in the database
        List<Author> userCustomList = userCustomRepository.findAll();
        assertThat(userCustomList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAuthor() throws Exception {
        // Initialize the database
        userCustomRepository.saveAndFlush(author);
        userCustomSearchRepository.save(author);
        int databaseSizeBeforeDelete = userCustomRepository.findAll().size();

        // Get the author
        restAuthorMockMvc.perform(delete("/api/authors/{id}", author.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean userCustomExistsInEs = userCustomSearchRepository.exists(author.getId());
        assertThat(userCustomExistsInEs).isFalse();

        // Validate the database is empty
        List<Author> userCustomList = userCustomRepository.findAll();
        assertThat(userCustomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAuthor() throws Exception {
        // Initialize the database
        userCustomRepository.saveAndFlush(author);
        userCustomSearchRepository.save(author);

        // Search the author
        restAuthorMockMvc.perform(get("/api/_search/authors?query=id:" + author.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(author.getId().intValue())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].bio").value(hasItem(DEFAULT_BIO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Author.class);
        Author userCustom1 = new Author();
        userCustom1.setId(1L);
        Author userCustom2 = new Author();
        userCustom2.setId(userCustom1.getId());
        assertThat(userCustom1).isEqualTo(userCustom2);
        userCustom2.setId(2L);
        assertThat(userCustom1).isNotEqualTo(userCustom2);
        userCustom1.setId(null);
        assertThat(userCustom1).isNotEqualTo(userCustom2);
    }
}
