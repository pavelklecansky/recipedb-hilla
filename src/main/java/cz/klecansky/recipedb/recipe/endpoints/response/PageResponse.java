package cz.klecansky.recipedb.recipe.endpoints.response;

import com.vaadin.hilla.Nonnull;

import java.util.List;
import java.util.Objects;

public record PageResponse<T>(@Nonnull List<@Nonnull T> data, @Nonnull long count) {

    @Override
    public String toString() {
        return "PageResponse[" +
                "data=" + data + ", " +
                "count=" + count + ']';
    }

}
