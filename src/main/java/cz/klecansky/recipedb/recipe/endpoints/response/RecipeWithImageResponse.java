package cz.klecansky.recipedb.recipe.endpoints.response;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import cz.klecansky.recipedb.tag.io.TagEntity;
import org.jspecify.annotations.NonNull;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public record RecipeWithImageResponse(@NonNull UUID id, @NonNull String name, @NonNull String description, @NonNull Integer prepTimeInMinutes, @NonNull Integer cookTimeInMinutes, @NonNull Integer servings,
                                      @NonNull List<@NonNull IngredientResponse> ingredients, @NonNull String directions, @NonNull Integer rating, @NonNull String imageBase64, @JsonManagedReference @NonNull Set<@NonNull TagEntity> tags) {
}
