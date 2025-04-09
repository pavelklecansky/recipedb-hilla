package cz.klecansky.recipedb.tag.services;

import cz.klecansky.recipedb.tag.endpoints.response.BasicTagResponse;
import cz.klecansky.recipedb.tag.io.TagEntity;
import cz.klecansky.recipedb.tag.io.TagEntityRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@ExtendWith(MockitoExtension.class)
class TagServiceTest {

    @Mock
    private TagEntityRepository tagEntityRepository;
    @InjectMocks
    private TagService tagService;

    @Test
    public void whenTagExists_returnOptionalOfExistingTag() {
        TagEntity tag = new TagEntity(UUID.fromString("27252945-771a-4ada-91ca-ed6cdb912df4"), "tag", Set.of());
        Mockito.when(tagEntityRepository.findById(UUID.fromString("27252945-771a-4ada-91ca-ed6cdb912df4"))).thenReturn(Optional.of(tag));

        Optional<BasicTagResponse> tagResponse = tagService.findById(UUID.fromString("27252945-771a-4ada-91ca-ed6cdb912df4"));
        if (tagResponse.isPresent()) {
            assertEquals(tagResponse.get().name(), "tag");
        } else {
            fail();
        }
    }

    @Test
    public void whenTagNotExists_returnEmptyOptional() {
        Mockito.when(tagEntityRepository.findById(UUID.fromString("27252945-771a-4ada-91ca-ed6cdb912df4"))).thenReturn(Optional.empty());

        Optional<BasicTagResponse> tagResponse = tagService.findById(UUID.fromString("27252945-771a-4ada-91ca-ed6cdb912df4"));
        assertFalse(tagResponse.isPresent());
    }
}