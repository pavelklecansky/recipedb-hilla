package cz.klecansky.recipedb.recipe.endpoints.response;

import dev.hilla.Nonnull;

import java.util.List;
import java.util.Objects;

public final class PageResponse<T> {
    private final @Nonnull List<@Nonnull T> data;
    private final @Nonnull long count;

    public PageResponse(@Nonnull List<@Nonnull T> data, @Nonnull long count) {
        this.data = data;
        this.count = count;
    }

    public @Nonnull List<@Nonnull T> data() {
        return data;
    }

    public @Nonnull long count() {
        return count;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (PageResponse) obj;
        return Objects.equals(this.data, that.data) &&
                this.count == that.count;
    }

    @Override
    public int hashCode() {
        return Objects.hash(data, count);
    }

    @Override
    public String toString() {
        return "PageResponse[" +
                "data=" + data + ", " +
                "count=" + count + ']';
    }

}
