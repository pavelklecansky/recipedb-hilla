package cz.klecansky.recipedb.user;


import cz.klecansky.recipedb.security.AuthenticatedUser;
import cz.klecansky.recipedb.user.io.User;
import dev.hilla.Endpoint;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import javax.annotation.security.PermitAll;
import java.util.Optional;


@Endpoint
@PermitAll
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class UserEndpoint {

    @NonNull AuthenticatedUser authenticatedUser;

    public Optional<User> getAuthenticatedUser() {
        return authenticatedUser.get();
    }
}
