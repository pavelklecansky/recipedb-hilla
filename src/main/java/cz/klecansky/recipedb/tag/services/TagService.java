package cz.klecansky.recipedb.tag.services;

import cz.klecansky.recipedb.tag.endpoints.response.BasicTagResponse;
import cz.klecansky.recipedb.tag.io.TagEntity;
import cz.klecansky.recipedb.tag.io.TagEntityRepository;
import dev.hilla.exception.EndpointException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class TagService {

    @NonNull TagEntityRepository tagRepository;

    public List<BasicTagResponse> findAll() {
        return tagRepository.findAll().stream().map(this::convertTagEntityToBasicTagResponse).toList();
    }

    public Optional<TagEntity> findById(UUID id) {
        return tagRepository.findById(id);
    }

    public TagEntity save(String tag) {
        Optional<TagEntity> byName = tagRepository.findByName(tag);
        if (byName.isPresent()) {
            throw new EndpointException("Tag name must be unique.");
        }

        TagEntity newTag = new TagEntity();
        newTag.setName(tag);
        return tagRepository.save(newTag);
    }

    public void deleteById(UUID id) {
        tagRepository.deleteById(id);
    }

    private BasicTagResponse convertTagEntityToBasicTagResponse(TagEntity tagEntity) {
        return new BasicTagResponse(tagEntity.getId(), tagEntity.getName());
    }
}
