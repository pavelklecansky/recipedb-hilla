package cz.klecansky.recipedb.recipe.io;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.Objects;

@Entity(name = "RecipeIngredient")
@Table(name = "recipe_ingredient")
@Getter
@Setter
public class RecipeIngredient {

    @EmbeddedId
    private RecipeIngredientId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("recipeId")
    private RecipeEntity recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("ingredientId")
    private IngredientEntity ingredient;

    private Integer amount;
    @Enumerated(EnumType.STRING)
    private Measurement measurement;

    protected RecipeIngredient() {

    }

    public RecipeIngredient(RecipeEntity recipe, IngredientEntity ingredient, Integer amount, Measurement measurement) {
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.id = new RecipeIngredientId(recipe.getId(), ingredient.getId());
        this.amount = amount;
        this.measurement = measurement;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        RecipeIngredient that = (RecipeIngredient) o;
        return Objects.equals(recipe, that.recipe) &&
                Objects.equals(ingredient, that.ingredient);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipe, ingredient);
    }
}
