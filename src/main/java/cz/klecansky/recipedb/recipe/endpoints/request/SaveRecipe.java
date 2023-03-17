package cz.klecansky.recipedb.recipe.endpoints.request;

import cz.klecansky.recipedb.tag.endpoints.request.BasicTagRequest;
import dev.hilla.Nonnull;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class SaveRecipe {

    @Nonnull
    private String name;
    @Nonnull
    private String description;
    @Nonnull
    private Integer prepTimeInMinutes;
    @Nonnull
    private Integer cookTimeInMinutes;
    @Nonnull
    private Integer servings;
    @Nonnull
    private String ingredients;
    @Nonnull
    private String directions;
    @Nonnull
    Integer rating;
    @Nonnull
    private byte[] imageBase64;
    @Nonnull
    private Set<@Nonnull BasicTagRequest> tags;
}
