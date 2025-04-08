package cz.klecansky.recipedb.recipe.io;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Getter
@EqualsAndHashCode
@AllArgsConstructor
public class RecipeIngredientId implements Serializable {

    @Column(name = "recipe_id")
    private UUID recipeId;

    @Column(name = "ingredient_id")
    private UUID ingredientId;

    protected RecipeIngredientId() {
    }
}
