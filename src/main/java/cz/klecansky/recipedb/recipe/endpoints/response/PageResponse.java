package cz.klecansky.recipedb.recipe.endpoints.response;

import dev.hilla.Nonnull;

import java.util.List;

public record PageResponse<T>(@Nonnull List<@Nonnull T> data, @Nonnull long count) {
}
