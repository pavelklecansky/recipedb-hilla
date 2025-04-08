package cz.klecansky.recipedb.tag.services;

import cz.klecansky.recipedb.recipe.endpoints.response.PageResponse;
import cz.klecansky.recipedb.tag.endpoints.response.BasicTagResponse;
import cz.klecansky.recipedb.tag.io.TagEntity;
import cz.klecansky.recipedb.tag.io.TagEntityRepository;
import com.vaadin.hilla.exception.EndpointException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public PageResponse<BasicTagResponse> findAll(Integer page, Integer size, String sort, String search) {
        String[] split = sort.split("\\|");
        Pageable pagingSort = PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(split[1]), split[0]));
        Page<BasicTagResponse> map;
        if (search.isEmpty()) {
            map = tagRepository.findAll(pagingSort).map(this::convertTagEntityToBasicTagResponse);
        } else {
            map = tagRepository.findByNameContaining(search, pagingSort).map(this::convertTagEntityToBasicTagResponse);
        }
        return new PageResponse<>(map.toList(), map.getTotalElements());
    }

    public Optional<BasicTagResponse> findById(UUID id) {
        return tagRepository.findById(id).map(this::convertTagEntityToBasicTagResponse);
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

    public List<BasicTagResponse> findAll() {
        return tagRepository.findAll().stream().map(this::convertTagEntityToBasicTagResponse).toList();
    }
}
