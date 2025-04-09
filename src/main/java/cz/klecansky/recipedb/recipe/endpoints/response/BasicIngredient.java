package cz.klecansky.recipedb.recipe.endpoints.response;

import org.jspecify.annotations.NonNull;

import java.util.UUID;

public record BasicIngredient(@NonNull UUID id, @NonNull String name) {
}
