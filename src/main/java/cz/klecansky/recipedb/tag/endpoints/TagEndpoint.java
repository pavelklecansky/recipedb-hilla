package cz.klecansky.recipedb.tag.endpoints;

import cz.klecansky.recipedb.recipe.endpoints.request.PaginationRequest;
import cz.klecansky.recipedb.recipe.endpoints.response.PageResponse;
import cz.klecansky.recipedb.tag.endpoints.response.BasicTagResponse;
import cz.klecansky.recipedb.tag.io.TagEntity;
import cz.klecansky.recipedb.tag.services.TagService;
import com.vaadin.hilla.Endpoint;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;

import jakarta.annotation.security.PermitAll;
import java.util.List;
import java.util.UUID;

@Endpoint
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
@PermitAll
public class TagEndpoint {

    @NonNull TagService tagService;

    public List<BasicTagResponse> findAll() {
        return tagService.findAll();
    }

    public PageResponse<BasicTagResponse> findAllPagination(PaginationRequest request) {
        return tagService.findAll(request.page().orElse(0), request.pageSize().orElse(5), request.sort().orElse("name|ASC"), request.search().orElse(""));
    }

    public BasicTagResponse findById(UUID id) {
        return tagService.findById(id).orElseThrow();
    }

    public TagEntity newTag(String tag) {
        return tagService.save(tag);
    }

    public void deleteTag(UUID id) {
        tagService.deleteById(id);
    }

}
