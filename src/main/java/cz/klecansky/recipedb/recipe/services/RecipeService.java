package cz.klecansky.recipedb.recipe.services;

import cz.klecansky.recipedb.recipe.endpoints.request.IngredientRequest;
import cz.klecansky.recipedb.recipe.endpoints.request.SaveRecipe;
import cz.klecansky.recipedb.recipe.endpoints.response.BasicIngredient;
import cz.klecansky.recipedb.recipe.endpoints.response.IngredientResponse;
import cz.klecansky.recipedb.recipe.endpoints.response.PageResponse;
import cz.klecansky.recipedb.recipe.endpoints.response.RecipeWithImageResponse;
import cz.klecansky.recipedb.recipe.io.*;
import cz.klecansky.recipedb.tag.endpoints.request.BasicTagRequest;
import cz.klecansky.recipedb.tag.io.TagEntity;
import cz.klecansky.recipedb.tag.io.TagEntityRepository;
import dev.hilla.exception.EndpointException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    @NonNull IngredientEntityRepository ingredientEntityRepository;

    @Transactional
    public PageResponse<RecipeWithImageResponse> findAll(Integer page, Integer size, String sort, String search) {
        String[] split = sort.split("\\|");
        Pageable pagingSort = PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(split[1]), split[0]));
        Page<RecipeWithImageResponse> map;
        if (search.isEmpty()) {
            map = recipeRepository.findAll(pagingSort).map(this::convertRecipeEntityToRecipeWithImageResponse);
        } else {
            map = recipeRepository.findByNameContaining(search, pagingSort).map(this::convertRecipeEntityToRecipeWithImageResponse);
        }
        return new PageResponse<>(map.toList(), map.getTotalElements());
    }

    public List<RecipeWithImageResponse> findAll() {
        return recipeRepository.findAll().stream().map(this::convertRecipeEntityToRecipeWithImageResponse).toList();
    }

    public List<BasicIngredient> findAllIngredients() {
        return ingredientEntityRepository.findAll().stream().map(ingredient -> new BasicIngredient(ingredient.getId(), ingredient.getName())).toList();
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
        return new RecipeWithImageResponse(recipe.getId(), recipe.getName(), recipe.getDescription(), recipe.getPrepTimeInMinutes(), recipe.getCookTimeInMinutes(), recipe.getServings(), recipe.getRecipeIngredients().stream().map(this::createIngredientResponseFromRecipeIngredient).toList(), recipe.getDirections(), recipe.getRating(), base64EncodedImageBytes, recipe.getTags());
    }

    @Transactional
    public Optional<RecipeWithImageResponse> findById(UUID id) {
        return recipeRepository.findById(id).map(this::convertRecipeEntityToRecipeWithImageResponse);
    }

    @Transactional
    public RecipeWithImageResponse save(SaveRecipe recipe) {
        RecipeEntity recipeEntity = createRecipeToRecipeEntity(recipe);
        RecipeEntity save = recipeRepository.saveAndFlush(recipeEntity);
        return convertRecipeEntityToRecipeWithImageResponse(save);
    }

    private RecipeEntity createRecipeToRecipeEntity(SaveRecipe recipe) {
        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setId(UUID.randomUUID());
        recipeEntity.setName(recipe.getName());
        recipeEntity.setDescription(recipe.getDescription());
        recipeEntity.setDirections(recipe.getDirections());
        recipeEntity.setPrepTimeInMinutes(recipe.getPrepTimeInMinutes());
        recipeEntity.setCookTimeInMinutes(recipe.getCookTimeInMinutes());
        recipeEntity.setServings(recipe.getServings());
        recipeEntity.setImage(recipe.getImageBase64());
        recipeEntity.setRating(recipe.getRating());
        for (IngredientRequest ingredient : recipe.getIngredients()) {
            List<String> stringStream = recipe.getIngredients().stream().map(IngredientRequest::getName).sorted().distinct().toList();
            if (stringStream.size() < recipe.getIngredients().size()) {
                throw new EndpointException("Cannot have two same ingredients.");
            }
            Optional<IngredientEntity> byName = ingredientEntityRepository.findByName(ingredient.getName());
            byName.ifPresent(ingredientEntity -> recipeEntity.addIngredient(ingredientEntity, ingredient.getAmount(), ingredient.getMeasurement()));
        }
        for (BasicTagRequest tag : recipe.getTags()) {
            Optional<TagEntity> tagById = tagEntityRepository.findById(tag.getId());
            tagById.ifPresent(tagEntity -> recipeEntity.getTags().add(tagEntity));
        }
        return recipeEntity;
    }

    private IngredientResponse createIngredientResponseFromRecipeIngredient(RecipeIngredient recipeIngredient) {
        return new IngredientResponse(recipeIngredient.getIngredient().getName(), recipeIngredient.getMeasurement(), recipeIngredient.getAmount());
    }

    @Transactional
    public void deleteAll() {
        recipeRepository.deleteAll();
    }

    @Transactional
    public void deleteById(UUID id) {
        findById(id).ifPresent(recipeWithImageResponse -> recipeRepository.deleteById(id));
    }

    public Optional<RecipeWithImageResponse> update(UUID id, SaveRecipe recipe) {
        return recipeRepository.findById(id)
                .map(oldRecipe -> {
                    oldRecipe.setName(recipe.getName());
                    oldRecipe.setDescription(recipe.getDescription());
                    oldRecipe.setDirections(recipe.getDirections());
                    oldRecipe.setServings(recipe.getServings());
                    oldRecipe.setCookTimeInMinutes(recipe.getCookTimeInMinutes());
                    oldRecipe.setPrepTimeInMinutes(recipe.getPrepTimeInMinutes());
                    oldRecipe.setRating(recipe.getRating());
                    if (recipe.getImageBase64().length != 0) {
                        oldRecipe.setImage(recipe.getImageBase64());
                    }
                    oldRecipe.removeAllIngredient();
                    for (IngredientRequest ingredient : recipe.getIngredients()) {
                        Optional<IngredientEntity> byName = ingredientEntityRepository.findByName(ingredient.getName());
                        byName.ifPresent(ingredientEntity -> oldRecipe.addIngredient(ingredientEntity, ingredient.getAmount(), ingredient.getMeasurement()));
                    }
                    oldRecipe.getTags().clear();
                    for (BasicTagRequest tag : recipe.getTags()) {
                        Optional<TagEntity> tagById = tagEntityRepository.findById(tag.getId());
                        tagById.ifPresent(tagEntity -> oldRecipe.getTags().add(tagEntity));
                    }
                    return recipeRepository.save(oldRecipe);
                }).map(this::convertRecipeEntityToRecipeWithImageResponse);
    }

    public BasicIngredient createNewIngredient(String name) {
        IngredientEntity ingredientEntity = new IngredientEntity();
        ingredientEntity.setId(UUID.randomUUID());
        ingredientEntity.setName(name);
        IngredientEntity save = ingredientEntityRepository.save(ingredientEntity);
        return new BasicIngredient(save.getId(), save.getName());
    }

    public PageResponse<RecipeWithImageResponse> findAllByTagsId(String id, Integer page, Integer size, String sort, String search) {
        String[] split = sort.split("\\|");
        Pageable pagingSort = PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(split[1]), split[0]));
        Page<RecipeWithImageResponse> map;
        if (search.isEmpty()) {
            map = recipeRepository.findAllByTagsId(UUID.fromString(id), pagingSort).map(this::convertRecipeEntityToRecipeWithImageResponse);
        } else {
            map = recipeRepository.findAllByTagsIdAndNameContaining(UUID.fromString(id), search, pagingSort).map(this::convertRecipeEntityToRecipeWithImageResponse);
        }
        return new PageResponse<>(map.toList(), map.getTotalElements());
    }
}
