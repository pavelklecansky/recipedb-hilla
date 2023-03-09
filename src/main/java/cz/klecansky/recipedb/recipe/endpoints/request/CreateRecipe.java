package cz.klecansky.recipedb.recipe.endpoints.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class CreateRecipe {

    private String name;
    private String description;
    private Integer prepTimeInMinutes;
    private Integer cookTimeInMinutes;
    private Integer servings;
    private String ingredients;
    private String directions;
    private String imageBase64;
}
