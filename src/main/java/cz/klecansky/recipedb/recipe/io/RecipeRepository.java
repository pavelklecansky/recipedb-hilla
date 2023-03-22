package cz.klecansky.recipedb.recipe.io;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity, UUID> {
    List<RecipeEntity> findAllByTagsId(UUID uuid);
    Page<RecipeEntity> findByNameContaining(String name, Pageable pageable);
}