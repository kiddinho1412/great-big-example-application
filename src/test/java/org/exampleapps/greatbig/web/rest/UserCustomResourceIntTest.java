package org.exampleapps.greatbig.web.rest;

import org.exampleapps.greatbig.GreatBigExampleApplicationApp;

import org.exampleapps.greatbig.domain.UserCustom;
import org.exampleapps.greatbig.repository.UserCustomRepository;
import org.exampleapps.greatbig.repository.search.UserCustomSearchRepository;
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
 * Test class for the UserCustomResource REST controller.
 *
 * @see UserCustomResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreatBigExampleApplicationApp.class)
public class UserCustomResourceIntTest {

    private static final String DEFAULT_BIO = "AAAAAAAAAA";
    private static final String UPDATED_BIO = "BBBBBBBBBB";

    @Autowired
    private UserCustomRepository userCustomRepository;

    @Autowired
    private UserCustomSearchRepository userCustomSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserCustomMockMvc;

    private UserCustom userCustom;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserCustomResource userCustomResource = new UserCustomResource(userCustomRepository, userCustomSearchRepository);
        this.restUserCustomMockMvc = MockMvcBuilders.standaloneSetup(userCustomResource)
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
    public static UserCustom createEntity(EntityManager em) {
        UserCustom userCustom = new UserCustom()
            .bio(DEFAULT_BIO);
        return userCustom;
    }

    @Before
    public void initTest() {
        userCustomSearchRepository.deleteAll();
        userCustom = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserCustom() throws Exception {
        int databaseSizeBeforeCreate = userCustomRepository.findAll().size();

        // Create the UserCustom
        restUserCustomMockMvc.perform(post("/api/user-customs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userCustom)))
            .andExpect(status().isCreated());

        // Validate the UserCustom in the database
        List<UserCustom> userCustomList = userCustomRepository.findAll();
        assertThat(userCustomList).hasSize(databaseSizeBeforeCreate + 1);
        UserCustom testUserCustom = userCustomList.get(userCustomList.size() - 1);
        assertThat(testUserCustom.getBio()).isEqualTo(DEFAULT_BIO);

        // Validate the UserCustom in Elasticsearch
        UserCustom userCustomEs = userCustomSearchRepository.findOne(testUserCustom.getId());
        assertThat(userCustomEs).isEqualToComparingFieldByField(testUserCustom);
    }

    @Test
    @Transactional
    public void createUserCustomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userCustomRepository.findAll().size();

        // Create the UserCustom with an existing ID
        userCustom.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserCustomMockMvc.perform(post("/api/user-customs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userCustom)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<UserCustom> userCustomList = userCustomRepository.findAll();
        assertThat(userCustomList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserCustoms() throws Exception {
        // Initialize the database
        userCustomRepository.saveAndFlush(userCustom);

        // Get all the userCustomList
        restUserCustomMockMvc.perform(get("/api/user-customs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userCustom.getId().intValue())))
            .andExpect(jsonPath("$.[*].bio").value(hasItem(DEFAULT_BIO.toString())));
    }

    @Test
    @Transactional
    public void getUserCustom() throws Exception {
        // Initialize the database
        userCustomRepository.saveAndFlush(userCustom);

        // Get the userCustom
        restUserCustomMockMvc.perform(get("/api/user-customs/{id}", userCustom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userCustom.getId().intValue()))
            .andExpect(jsonPath("$.bio").value(DEFAULT_BIO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserCustom() throws Exception {
        // Get the userCustom
        restUserCustomMockMvc.perform(get("/api/user-customs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserCustom() throws Exception {
        // Initialize the database
        userCustomRepository.saveAndFlush(userCustom);
        userCustomSearchRepository.save(userCustom);
        int databaseSizeBeforeUpdate = userCustomRepository.findAll().size();

        // Update the userCustom
        UserCustom updatedUserCustom = userCustomRepository.findOne(userCustom.getId());
        updatedUserCustom
            .bio(UPDATED_BIO);

        restUserCustomMockMvc.perform(put("/api/user-customs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserCustom)))
            .andExpect(status().isOk());

        // Validate the UserCustom in the database
        List<UserCustom> userCustomList = userCustomRepository.findAll();
        assertThat(userCustomList).hasSize(databaseSizeBeforeUpdate);
        UserCustom testUserCustom = userCustomList.get(userCustomList.size() - 1);
        assertThat(testUserCustom.getBio()).isEqualTo(UPDATED_BIO);

        // Validate the UserCustom in Elasticsearch
        UserCustom userCustomEs = userCustomSearchRepository.findOne(testUserCustom.getId());
        assertThat(userCustomEs).isEqualToComparingFieldByField(testUserCustom);
    }

    @Test
    @Transactional
    public void updateNonExistingUserCustom() throws Exception {
        int databaseSizeBeforeUpdate = userCustomRepository.findAll().size();

        // Create the UserCustom

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserCustomMockMvc.perform(put("/api/user-customs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userCustom)))
            .andExpect(status().isCreated());

        // Validate the UserCustom in the database
        List<UserCustom> userCustomList = userCustomRepository.findAll();
        assertThat(userCustomList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserCustom() throws Exception {
        // Initialize the database
        userCustomRepository.saveAndFlush(userCustom);
        userCustomSearchRepository.save(userCustom);
        int databaseSizeBeforeDelete = userCustomRepository.findAll().size();

        // Get the userCustom
        restUserCustomMockMvc.perform(delete("/api/user-customs/{id}", userCustom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean userCustomExistsInEs = userCustomSearchRepository.exists(userCustom.getId());
        assertThat(userCustomExistsInEs).isFalse();

        // Validate the database is empty
        List<UserCustom> userCustomList = userCustomRepository.findAll();
        assertThat(userCustomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchUserCustom() throws Exception {
        // Initialize the database
        userCustomRepository.saveAndFlush(userCustom);
        userCustomSearchRepository.save(userCustom);

        // Search the userCustom
        restUserCustomMockMvc.perform(get("/api/_search/user-customs?query=id:" + userCustom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userCustom.getId().intValue())))
            .andExpect(jsonPath("$.[*].bio").value(hasItem(DEFAULT_BIO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserCustom.class);
        UserCustom userCustom1 = new UserCustom();
        userCustom1.setId(1L);
        UserCustom userCustom2 = new UserCustom();
        userCustom2.setId(userCustom1.getId());
        assertThat(userCustom1).isEqualTo(userCustom2);
        userCustom2.setId(2L);
        assertThat(userCustom1).isNotEqualTo(userCustom2);
        userCustom1.setId(null);
        assertThat(userCustom1).isNotEqualTo(userCustom2);
    }
}
