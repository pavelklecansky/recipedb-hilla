package cz.klecansky.recipedb.recipe.endpoints.request;

import cz.klecansky.recipedb.recipe.io.Measurement;
import dev.hilla.Nonnull;
import lombok.Value;

@Value
public class IngredientRequest {
    @Nonnull String name;
    @Nonnull Measurement measurement;
    @Nonnull Integer amount;
}
