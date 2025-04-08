package cz.klecansky.recipedb.recipe.endpoints.response;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import cz.klecansky.recipedb.tag.io.TagEntity;
import com.vaadin.hilla.Nonnull;
import lombok.Value;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public record RecipeWithImageResponse(@Nonnull UUID id, @Nonnull String name, @Nonnull String description, @Nonnull Integer prepTimeInMinutes, @Nonnull Integer cookTimeInMinutes, @Nonnull Integer servings,
                                      @Nonnull List<@Nonnull IngredientResponse> ingredients, @Nonnull String directions, @Nonnull Integer rating, @Nonnull String imageBase64, @JsonManagedReference @Nonnull Set<@Nonnull TagEntity> tags) {
}
