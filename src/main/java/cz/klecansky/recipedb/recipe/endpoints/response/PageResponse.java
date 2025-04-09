package cz.klecansky.recipedb.recipe.endpoints.response;

import org.jspecify.annotations.NonNull;

import java.util.List;

public record PageResponse<T>(@NonNull List<@NonNull T> data, long count) {

}
