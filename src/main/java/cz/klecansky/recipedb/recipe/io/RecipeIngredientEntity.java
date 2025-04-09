package cz.klecansky.recipedb.recipe.io;

import lombok.*;

import jakarta.persistence.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "recipe_ingredient")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeIngredientEntity {

    @EmbeddedId
    private RecipeIngredientId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("recipeId")
    @EqualsAndHashCode.Include
    private RecipeEntity recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("ingredientId")
    @EqualsAndHashCode.Include
    private IngredientEntity ingredient;

    private Integer amount;
    @Enumerated(EnumType.STRING)
    private Measurement measurement;

    public RecipeIngredientEntity(RecipeEntity recipe, IngredientEntity ingredient, Integer amount, Measurement measurement) {
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.id = new RecipeIngredientId(recipe.getId(), ingredient.getId());
        this.amount = amount;
        this.measurement = measurement;
    }
}
