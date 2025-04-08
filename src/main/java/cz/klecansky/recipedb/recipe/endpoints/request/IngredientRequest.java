package cz.klecansky.recipedb.recipe.endpoints.request;

import cz.klecansky.recipedb.recipe.io.Measurement;
import com.vaadin.hilla.Nonnull;
import lombok.Value;

public record IngredientRequest(@Nonnull String name, @Nonnull Measurement measurement, @Nonnull Integer amount) {
}
