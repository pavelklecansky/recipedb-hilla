package cz.klecansky.recipedb.recipe.io;

import cz.klecansky.recipedb.tag.io.TagEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;

import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "recipe")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeEntity {

    @Id
    @EqualsAndHashCode.Include
    @NonNull
    @Column(name = "id")
    UUID id;

    @Nullable
    @Column(name = "cook_time_in_minutes")
    Integer cookTimeInMinutes;

    @Nullable
    @Column(name = "description", length = Integer.MAX_VALUE)
    String description;

    @Nullable
    @Column(name = "directions", length = Integer.MAX_VALUE)
    String directions;

    @Column(name = "image")
    @Lob
    @JdbcType(VarbinaryJdbcType.class)
    @Basic(fetch = FetchType.LAZY)
    byte[] image;

    @Size(max = 255)
    @NonNull
    @Column(name = "name")
    private String name;

    @Nullable
    @Column(name = "prep_time_in_minutes")
    Integer prepTimeInMinutes;

    @Nullable
    @Column(name = "rating")
    Integer rating;

    @Nullable
    @Column(name = "servings")
    Integer servings;

    @NonNull
    @OneToMany(mappedBy = "recipe")
    Set<RecipeIngredientEntity> recipeIngredientEntities = new LinkedHashSet<>();

    @NonNull
    @ManyToMany
    @JoinTable(name = "recipe_tag",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    Set<TagEntity> tags = new LinkedHashSet<>();

    public void addIngredient(IngredientEntity ingredient, Integer amount, Measurement measurement) {
        RecipeIngredientEntity recipeIngredientEntity = new RecipeIngredientEntity(this, ingredient, amount, measurement);
        recipeIngredientEntities.add(recipeIngredientEntity);
    }

    public void removeAllIngredient() {
        for (Iterator<RecipeIngredientEntity> iterator = recipeIngredientEntities.iterator();
             iterator.hasNext(); ) {
            RecipeIngredientEntity recipeIngredientEntity = iterator.next();
            iterator.remove();
            recipeIngredientEntity.setRecipe(null);
            recipeIngredientEntity.setIngredient(null);
        }
    }

}