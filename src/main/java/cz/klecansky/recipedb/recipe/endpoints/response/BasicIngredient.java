package cz.klecansky.recipedb.recipe.endpoints.response;

import com.vaadin.hilla.Nonnull;
import lombok.Value;

import java.util.UUID;

public record BasicIngredient(@Nonnull UUID id, @Nonnull String name) {
}
