package cz.klecansky.recipedb.tag.endpoints;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import cz.klecansky.recipedb.tag.endpoints.response.BasicTagResponse;
import cz.klecansky.recipedb.tag.io.TagEntity;
import cz.klecansky.recipedb.tag.services.TagService;
import dev.hilla.Endpoint;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.security.PermitAll;
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

    public TagEntity findById(UUID id) {
        return tagService.findById(id).orElseThrow();
    }

    public TagEntity newTag(String tag) {
        return tagService.save(tag);
    }

    public void deleteTag(UUID id) {
        tagService.deleteById(id);
    }

}
