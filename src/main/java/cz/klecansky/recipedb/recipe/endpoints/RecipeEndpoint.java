package cz.klecansky.recipedb.recipe.endpoints;

import cz.klecansky.recipedb.recipe.endpoints.request.SaveRecipe;
import cz.klecansky.recipedb.recipe.endpoints.response.BasicIngredient;
import cz.klecansky.recipedb.recipe.endpoints.response.PageResponse;
import cz.klecansky.recipedb.recipe.endpoints.response.RecipeWithImageResponse;
import cz.klecansky.recipedb.recipe.services.RecipeService;
import dev.hilla.Endpoint;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;

import javax.annotation.security.PermitAll;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Endpoint
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
@PermitAll
public class RecipeEndpoint {

    @NonNull RecipeService recipeService;

    public PageResponse<RecipeWithImageResponse> findAll(Optional<Integer> page, Optional<Integer> size, Optional<String> sort) {
        return recipeService.findAll(page.orElse(0), size.orElse(5), sort.orElse("name|ASC"));
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
