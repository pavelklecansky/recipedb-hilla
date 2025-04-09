package cz.klecansky.recipedb.tag.endpoints.response;

import org.jspecify.annotations.NonNull;

import java.util.UUID;

public record BasicTagResponse(@NonNull UUID id, @NonNull String name) {
}
