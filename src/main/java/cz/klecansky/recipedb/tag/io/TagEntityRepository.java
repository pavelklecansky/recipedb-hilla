package cz.klecansky.recipedb.tag.io;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TagEntityRepository extends JpaRepository<TagEntity, UUID> {
    Optional<TagEntity> findByName(String name);
}