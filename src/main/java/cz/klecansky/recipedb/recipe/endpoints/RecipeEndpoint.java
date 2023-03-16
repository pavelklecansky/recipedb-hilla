package cz.klecansky.recipedb.recipe.endpoints;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import cz.klecansky.recipedb.recipe.endpoints.request.SaveRecipe;
import cz.klecansky.recipedb.recipe.endpoints.response.RecipeWithImageResponse;
import cz.klecansky.recipedb.recipe.io.RecipeEntity;
import cz.klecansky.recipedb.recipe.services.RecipeService;
import dev.hilla.Endpoint;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.UUID;

@Endpoint
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
@AnonymousAllowed
@RequestMapping("/recipe")
public class RecipeEndpoint {

    @NonNull RecipeService recipeService;

    public List<RecipeWithImageResponse> findAll() {
        return recipeService.findAll();
    }

    public RecipeWithImageResponse findById(UUID id) {
        return recipeService.findById(id).orElseThrow();
    }

    public List<RecipeWithImageResponse> findAllByTagId(UUID id) {
        return recipeService.findAllByTagsId(id);
    }

    public RecipeWithImageResponse saveRecipe(SaveRecipe recipe) {
        return recipeService.save(recipe);
    }

    public RecipeWithImageResponse update(UUID id, SaveRecipe recipe) {
        return recipeService.update(id, recipe).orElseThrow();
    }

    public void deleteRecipe(UUID id) {
        recipeService.deleteById(id);
    }

}
