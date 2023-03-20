package cz.klecansky.recipedb.recipe.endpoints.response;

import cz.klecansky.recipedb.recipe.io.Measurement;
import dev.hilla.Nonnull;
import lombok.NonNull;
import lombok.Value;

@Value
public class IngredientResponse {
    @Nonnull String name;
    @Nonnull Measurement measurement;
    @Nonnull Integer amount;
}
