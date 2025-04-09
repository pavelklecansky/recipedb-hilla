package cz.klecansky.recipedb.recipe.endpoints.request;

import cz.klecansky.recipedb.recipe.io.Measurement;
import org.jspecify.annotations.NonNull;

public record IngredientRequest(@NonNull String name, @NonNull Measurement measurement, @NonNull Integer amount) {
}
