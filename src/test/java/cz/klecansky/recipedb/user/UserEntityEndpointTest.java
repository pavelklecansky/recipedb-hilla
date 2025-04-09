package cz.klecansky.recipedb.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import jakarta.servlet.http.Cookie;

import static cz.klecansky.recipedb.TestUtils.login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class UserEntityEndpointTest {
    @Autowired private MockMvc mockMvc;
    private Cookie[] cookies;

    @BeforeEach
    void setUp() throws Exception {
        cookies = login(mockMvc).toArray(Cookie[]::new);
    }

    @Test
    void whenUserLogin_thenReturns200() throws Exception {
        mockMvc.perform(post("/connect/UserEndpoint/getAuthenticatedUser").cookie(cookies)).andDo(print()).andExpect(status().isOk());
    }
}