package cz.klecansky.recipedb.tag.io;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TagEntityRepository extends JpaRepository<TagEntity, UUID> {
    Optional<TagEntity> findByName(String name);

    Page<TagEntity> findByNameContaining(String name, Pageable pageable);
}