package cz.klecansky.recipedb.recipe.endpoints.request;

import org.jspecify.annotations.NonNull;

import java.util.Optional;

public record PaginationRequest(Optional<String> id,
                                @NonNull Optional<Integer> page,
                                @NonNull Optional<Integer> pageSize,
                                @NonNull Optional<String> sort,
                                @NonNull Optional<String> search) {

}
