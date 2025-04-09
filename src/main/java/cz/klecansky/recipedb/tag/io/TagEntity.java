package cz.klecansky.recipedb.tag.io;

import com.fasterxml.jackson.annotation.JsonBackReference;
import cz.klecansky.recipedb.recipe.io.RecipeEntity;
import lombok.*;

import jakarta.persistence.*;
import lombok.experimental.FieldDefaults;
import org.jspecify.annotations.NonNull;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "tag")
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class TagEntity {

    @Id
    @Column(name = "id")
    @EqualsAndHashCode.Include
    @NonNull
    UUID id;

    @Column(name = "name", unique = true)
    @NonNull
    String name;

    @ManyToMany(mappedBy = "tags")
    @JsonBackReference
    @NonNull
    Set<RecipeEntity> recipes = new HashSet<>();

    @PreRemove
    private void removeGroupsFromUsers() {
        for (RecipeEntity u : recipes) {
            u.getTags().remove(this);
        }
    }
}