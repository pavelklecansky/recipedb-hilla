package cz.klecansky.recipedb.recipe.endpoints.response;

import cz.klecansky.recipedb.recipe.io.Measurement;
import dev.hilla.Nonnull;
import lombok.Value;

import java.util.UUID;

@Value
public class BasicIngredient {
    @Nonnull private UUID id;
    @Nonnull String name;
}
