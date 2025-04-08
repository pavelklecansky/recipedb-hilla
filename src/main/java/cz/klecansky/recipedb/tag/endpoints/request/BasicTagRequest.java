package cz.klecansky.recipedb.tag.endpoints.request;

import com.vaadin.hilla.Nonnull;
import lombok.Value;

import java.util.UUID;

@Value
public class BasicTagRequest {
    @Nonnull
    UUID id;

    @Nonnull
    String name;
}
