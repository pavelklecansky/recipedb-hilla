package cz.klecansky.recipedb.tag.endpoints.response;

import com.vaadin.hilla.Nonnull;
import lombok.Value;

import java.util.UUID;

@Value
public class BasicTagResponse {
    @Nonnull
    UUID id;

    @Nonnull
    String name;
}
