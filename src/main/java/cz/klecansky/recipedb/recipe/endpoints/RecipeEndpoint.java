package cz.klecansky.recipedb.recipe.endpoints;

import cz.klecansky.recipedb.recipe.endpoints.request.SaveRecipe;
import cz.klecansky.recipedb.recipe.endpoints.response.BasicIngredient;
import cz.klecansky.recipedb.recipe.endpoints.response.RecipeWithImageResponse;
import cz.klecansky.recipedb.recipe.services.RecipeService;
import dev.hilla.Endpoint;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;

import javax.annotation.security.PermitAll;
import java.util.List;
import java.util.UUID;

@Endpoint
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
@PermitAll
public class RecipeEndpoint {

    @NonNull RecipeService recipeService;

    public List<RecipeWithImageResponse> findAll() {
        return recipeService.findAll();
    }

    public List<BasicIngredient> findAllIngredients() {
        return recipeService.findAllIngredients();
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

    public BasicIngredient createNewIngredient(String name) {
        return recipeService.createNewIngredient(name);
    }
}
