package cz.klecansky.recipedb.recipe.endpoints;

import cz.klecansky.recipedb.recipe.endpoints.request.PaginationRequest;
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

    public PageResponse<RecipeWithImageResponse> findAll(PaginationRequest request) {
        return recipeService.findAll(request.page().orElse(0), request.pageSize().orElse(5), request.sort().orElse("name|ASC"), request.search().orElse(""));
    }

    public List<BasicIngredient> findAllIngredients() {
        return recipeService.findAllIngredients();
    }

    public RecipeWithImageResponse findById(UUID id) {
        return recipeService.findById(id).orElseThrow();
    }

    public PageResponse<RecipeWithImageResponse> findAllByTagId(PaginationRequest request) {
        return recipeService.findAllByTagsId(request.id().orElseThrow(), request.page().orElse(0), request.pageSize().orElse(5), request.sort().orElse("name|ASC"), request.search().orElse(""));
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
