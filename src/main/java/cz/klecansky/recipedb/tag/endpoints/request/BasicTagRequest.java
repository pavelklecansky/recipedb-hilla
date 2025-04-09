package cz.klecansky.recipedb.tag.endpoints.request;

import org.jspecify.annotations.NonNull;

import java.util.UUID;


public record BasicTagRequest(@NonNull UUID id, @NonNull String name) {
}
