package cz.klecansky.recipedb.recipe.io;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.NaturalIdCache;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "ingredient")
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NaturalIdCache
public class IngredientEntity {

    @Id
    @NonNull
    @Column(name = "id")
    UUID id;

    @NaturalId
    @NonNull
    @EqualsAndHashCode.Include
    @Column(name = "name")
    String name;
}
