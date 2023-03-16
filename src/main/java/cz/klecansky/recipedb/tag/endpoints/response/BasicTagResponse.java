package cz.klecansky.recipedb.tag.endpoints.response;

import dev.hilla.Nonnull;
import lombok.Data;
import lombok.Value;

import java.util.UUID;

@Value
public class BasicTagResponse {
    @Nonnull
    UUID id;

    @Nonnull
    String name;
}
