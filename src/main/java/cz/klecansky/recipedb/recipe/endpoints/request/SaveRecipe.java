package cz.klecansky.recipedb.recipe.endpoints.request;

import cz.klecansky.recipedb.tag.endpoints.request.BasicTagRequest;
import org.jspecify.annotations.NonNull;

import java.util.List;
import java.util.Set;

public record SaveRecipe(@NonNull String name, @NonNull String description, @NonNull Integer prepTimeInMinutes, @NonNull Integer cookTimeInMinutes, @NonNull Integer servings, @NonNull List<@NonNull IngredientRequest> ingredients,
                         @NonNull String directions, @NonNull Integer rating, @NonNull byte[] imageBase64, @NonNull Set<@NonNull BasicTagRequest> tags) {

}
