package cz.klecansky.recipedb.recipe.services;

import cz.klecansky.recipedb.recipe.endpoints.request.SaveRecipe;
import cz.klecansky.recipedb.recipe.endpoints.response.RecipeWithImageResponse;
import cz.klecansky.recipedb.recipe.io.RecipeEntity;
import cz.klecansky.recipedb.recipe.io.RecipeRepository;
import cz.klecansky.recipedb.tag.endpoints.request.BasicTagRequest;
import cz.klecansky.recipedb.tag.io.TagEntity;
import cz.klecansky.recipedb.tag.io.TagEntityRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class RecipeService {

    @NonNull RecipeRepository recipeRepository;
    @NonNull TagEntityRepository tagEntityRepository;

    @Transactional
    public List<RecipeWithImageResponse> findAll() {
        return recipeRepository.findAll().stream().map(this::convertRecipeEntityToRecipeWithImageResponse).toList();
    }

    @Transactional
    public List<RecipeWithImageResponse> findAllByTagsId(UUID tag) {
        return recipeRepository.findAllByTagsId(tag).stream().map(this::convertRecipeEntityToRecipeWithImageResponse).toList();
    }

    private RecipeWithImageResponse convertRecipeEntityToRecipeWithImageResponse(RecipeEntity recipe) {
        String base64EncodedImageBytes = "";
        if (recipe.getImage() != null) {
            byte[] image = recipe.getImage();
            try (InputStream is = new BufferedInputStream(new ByteArrayInputStream(recipe.getImage()))) {
                String mimeType = URLConnection.guessContentTypeFromStream(is);
                if (mimeType != null) {
                    base64EncodedImageBytes = "data:" + mimeType + ";base64," + Base64.getEncoder().encodeToString(image);
                }
            } catch (IOException e) {
            }
        }

        return new RecipeWithImageResponse(recipe.getId(), recipe.getName(), recipe.getDescription(), recipe.getPrepTimeInMinutes(), recipe.getCookTimeInMinutes(), recipe.getServings(), recipe.getIngredients(), recipe.getDirections(), base64EncodedImageBytes, recipe.getTags());
    }

    @Transactional
    public Optional<RecipeWithImageResponse> findById(UUID id) {
        return recipeRepository.findById(id).map(this::convertRecipeEntityToRecipeWithImageResponse);
    }

    @Transactional
    public RecipeWithImageResponse save(SaveRecipe recipe) {
        RecipeEntity recipeEntity = createRecipeToRecipeEntity(recipe);
        RecipeEntity save = recipeRepository.save(recipeEntity);
        return convertRecipeEntityToRecipeWithImageResponse(save);
    }

    private RecipeEntity createRecipeToRecipeEntity(SaveRecipe recipe) {
        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setName(recipe.getName());
        recipeEntity.setDescription(recipe.getDescription());
        recipeEntity.setDirections(recipe.getDescription());
        recipeEntity.setIngredients(recipe.getIngredients());
        recipeEntity.setPrepTimeInMinutes(recipe.getPrepTimeInMinutes());
        recipeEntity.setCookTimeInMinutes(recipe.getCookTimeInMinutes());
        recipeEntity.setServings(recipe.getServings());
        recipeEntity.setImage(recipe.getImageBase64());
        for (BasicTagRequest tag : recipe.getTags()) {
            Optional<TagEntity> tagById = tagEntityRepository.findById(tag.getId());
            tagById.ifPresent(tagEntity -> recipeEntity.getTags().add(tagEntity));
        }
        return recipeEntity;
    }

    public void deleteById(UUID id) {
        recipeRepository.deleteById(id);
    }

    public Optional<RecipeWithImageResponse> update(UUID id, SaveRecipe recipe) {
        return recipeRepository.findById(id)
                .map(oldRecipe -> {
                    oldRecipe.setName(recipe.getName());
                    oldRecipe.setDescription(recipe.getDescription());
                    oldRecipe.setIngredients(recipe.getIngredients());
                    oldRecipe.setDirections(recipe.getDirections());
                    oldRecipe.setServings(recipe.getServings());
                    oldRecipe.setCookTimeInMinutes(recipe.getCookTimeInMinutes());
                    oldRecipe.setPrepTimeInMinutes(recipe.getPrepTimeInMinutes());
                    if (recipe.getImageBase64().length != 0) {
                        oldRecipe.setImage(recipe.getImageBase64());
                    }
                    oldRecipe.getTags().clear();
                    for (BasicTagRequest tag : recipe.getTags()) {
                        Optional<TagEntity> tagById = tagEntityRepository.findById(tag.getId());
                        tagById.ifPresent(tagEntity -> oldRecipe.getTags().add(tagEntity));
                    }
                    return recipeRepository.save(oldRecipe);
                }).map(this::convertRecipeEntityToRecipeWithImageResponse);
    }
}
