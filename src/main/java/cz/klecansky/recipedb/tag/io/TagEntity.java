package cz.klecansky.recipedb.tag.io;

import com.fasterxml.jackson.annotation.JsonBackReference;
import cz.klecansky.recipedb.recipe.io.RecipeEntity;
import dev.hilla.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "tag")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TagEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    @Nonnull
    private UUID id;
    @Column(name = "name", nullable = false, unique = true)
    @Nonnull
    private String name;

    @ManyToMany(mappedBy = "tags")
    @JsonBackReference
    @Nonnull
    private Set<RecipeEntity> recipes = new HashSet<>();

    @PreRemove
    private void removeGroupsFromUsers() {
        for (RecipeEntity u : recipes) {
            u.getTags().remove(this);
        }
    }
}