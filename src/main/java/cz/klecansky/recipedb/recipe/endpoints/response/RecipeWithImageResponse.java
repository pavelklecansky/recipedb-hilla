package cz.klecansky.recipedb.recipe.endpoints.response;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import cz.klecansky.recipedb.tag.io.TagEntity;
import dev.hilla.Nonnull;
import lombok.Value;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Value
public class RecipeWithImageResponse {
    @Nonnull
    UUID id;
    @Nonnull
    String name;
    @Nonnull
    String description;
    @Nonnull
    Integer prepTimeInMinutes;
    @Nonnull
    Integer cookTimeInMinutes;
    @Nonnull
    Integer servings;
    @Nonnull
    String ingredients;
    @Nonnull
    String directions;
    @Nonnull
    String imageBase64;
    @Nonnull
    @JsonManagedReference
    Set<@Nonnull TagEntity> tags;
}
