package cz.klecansky.recipedb.recipe.io;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface IngredientEntityRepository extends JpaRepository<IngredientEntity, UUID> {
    Optional<IngredientEntity> findByName(String name);
}