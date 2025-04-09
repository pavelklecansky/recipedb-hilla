package cz.klecansky.recipedb.recipe.io;

import lombok.*;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecipeIngredientId implements Serializable {

    @Column(name = "recipe_id")
    UUID recipeId;

    @Column(name = "ingredient_id")
    UUID ingredientId;
}
