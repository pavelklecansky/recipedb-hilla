package cz.klecansky.recipedb.recipe.io;

import cz.klecansky.recipedb.recipe.domain.Difficulty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

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

    private String description;
    private Integer prepTimeInMinutes;
    private Integer cookTimeInMinutes;
    private Integer servings;
    private String ingredients;
    private String directions;
}