package cz.klecansky.recipedb.recipe.endpoints.response;

import cz.klecansky.recipedb.recipe.io.Measurement;
import org.jspecify.annotations.NonNull;

public record IngredientResponse(@NonNull String name, @NonNull Measurement measurement, @NonNull Integer amount) {
}
