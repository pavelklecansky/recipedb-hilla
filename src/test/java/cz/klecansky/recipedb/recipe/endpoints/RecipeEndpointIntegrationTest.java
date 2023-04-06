package cz.klecansky.recipedb.recipe.endpoints;

import cz.klecansky.recipedb.recipe.endpoints.request.SaveRecipe;
import cz.klecansky.recipedb.recipe.services.RecipeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import javax.servlet.http.Cookie;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static cz.klecansky.recipedb.TestUtils.login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class RecipeEndpointIntegrationTest {

    private static final SaveRecipe recipe = new SaveRecipe("test", "description", 5, 10, 10, List.of(), "direction", 4, new byte[]{}, Set.of());

    @Autowired private MockMvc mockMvc;
    @Autowired RecipeService recipeService;

    private Cookie[] cookies;

    @BeforeEach
    void setUp() throws Exception {
        cookies = login(mockMvc).toArray(Cookie[]::new);
    }

    @Test
    void whenRecipe_thenReturns200() throws Exception {
        var created = recipeService.save(recipe);
        mockMvc.perform(post("/connect/RecipeEndpoint/findAll").cookie(cookies).contentType(MediaType.APPLICATION_JSON).content("{\"request\":{\"page\":0,\"pageSize\":6,\"sort\":\"name|ASC\",\"search\":\"\"}}")).andDo(print()).andExpect(status().isOk());
    }

    @Test
    void whenRecipeByIdNotFound_thenReturns500() throws Exception {
        mockMvc.perform(post("/connect/RecipeEndpoint/findById").cookie(cookies).contentType(MediaType.APPLICATION_JSON).content("{\"id\":\"74e7eff8-c0a8-40cf-8e33-4fd813a49899\"}")).andDo(print()).andExpect(status().is5xxServerError());
    }
}