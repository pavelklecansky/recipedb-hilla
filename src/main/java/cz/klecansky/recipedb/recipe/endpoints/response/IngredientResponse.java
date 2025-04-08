package cz.klecansky.recipedb.recipe.endpoints.response;

import cz.klecansky.recipedb.recipe.io.Measurement;
import com.vaadin.hilla.Nonnull;
import lombok.Value;

public record IngredientResponse(@Nonnull String name, @Nonnull Measurement measurement, @Nonnull Integer amount) {
}
