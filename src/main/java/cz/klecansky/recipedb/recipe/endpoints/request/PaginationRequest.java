package cz.klecansky.recipedb.recipe.endpoints.request;

import dev.hilla.Nonnull;

import java.util.Optional;

public record PaginationRequest(Optional<String> id, @Nonnull Optional<Integer> page,
                                @Nonnull Optional<Integer> pageSize, @Nonnull Optional<String> sort,
                                @Nonnull Optional<String> search) {

}
