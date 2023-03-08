package cz.klecansky.recipedb.recipe.endpoints;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import cz.klecansky.recipedb.recipe.io.RecipeEntity;
import cz.klecansky.recipedb.recipe.services.RecipeService;
import dev.hilla.Endpoint;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.UUID;

@Endpoint
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
@AnonymousAllowed
@RequestMapping("/recipe")
public class RecipeEndpoint {

    @NonNull RecipeService recipeService;

    public List<RecipeEntity> findAll() {
        return recipeService.findAll();
    }

    public RecipeEntity findById(UUID id) {
        return recipeService.findById(id).orElseThrow();
    }

    public RecipeEntity saveRecipe(RecipeEntity recipe) {
        return recipeService.save(recipe);
    }

    public RecipeEntity update(UUID id, RecipeEntity recipe) {
        return recipeService.update(id, recipe).orElseThrow();
    }

    public void deleteRecipe(UUID id) {
        recipeService.deleteById(id);
    }

}
