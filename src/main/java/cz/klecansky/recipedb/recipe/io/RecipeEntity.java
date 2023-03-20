package cz.klecansky.recipedb.recipe.io;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import cz.klecansky.recipedb.tag.io.TagEntity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "recipe")
@Getter
@Setter
public class RecipeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private Integer prepTimeInMinutes;
    private Integer cookTimeInMinutes;
    private Integer servings;
    @OneToMany(
            mappedBy = "recipe",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<RecipeIngredient> recipeIngredients = new ArrayList<>();
    @Column(columnDefinition = "TEXT")
    private String directions;
    Integer rating;
    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(
            name = "recipe_tag",
            joinColumns = {@JoinColumn(name = "recipe_id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id")}
    )
    @JsonManagedReference
    private Set<TagEntity> tags = new HashSet<>();

    public void addIngredient(IngredientEntity ingredient, Integer amount, Measurement measurement) {
        RecipeIngredient recipeIngredient = new RecipeIngredient(this, ingredient, amount, measurement);
        recipeIngredients.add(recipeIngredient);
    }

    public void removeAllIngredient() {
        for (Iterator<RecipeIngredient> iterator = recipeIngredients.iterator();
             iterator.hasNext(); ) {
            RecipeIngredient recipeIngredient = iterator.next();
            iterator.remove();
            recipeIngredient.setRecipe(null);
            recipeIngredient.setIngredient(null);
        }
    }

    public void removeIngredient(IngredientEntity ingredient) {
        for (Iterator<RecipeIngredient> iterator = recipeIngredients.iterator();
             iterator.hasNext(); ) {
            RecipeIngredient recipeIngredient = iterator.next();

            if (recipeIngredient.getRecipe().equals(this) &&
                    recipeIngredient.getIngredient().equals(ingredient)) {
                iterator.remove();
                recipeIngredient.setRecipe(null);
                recipeIngredient.setIngredient(null);
            }
        }
    }
}