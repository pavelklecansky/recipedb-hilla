package cz.klecansky.recipedb.recipe.endpoints.request;

import cz.klecansky.recipedb.tag.endpoints.request.BasicTagRequest;
import dev.hilla.Nonnull;
import lombok.Value;
import java.util.List;
import java.util.Set;

@Value
public class SaveRecipe {

    @Nonnull String name;
    @Nonnull String description;
    @Nonnull Integer prepTimeInMinutes;
    @Nonnull Integer cookTimeInMinutes;
    @Nonnull Integer servings;
    @Nonnull List<@Nonnull IngredientRequest> ingredients;
    @Nonnull String directions;
    @Nonnull Integer rating;
    @Nonnull byte[] imageBase64;
    @Nonnull Set<@Nonnull BasicTagRequest> tags;
}
