package cz.klecansky.recipedb.user;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import cz.klecansky.recipedb.security.AuthenticatedUser;
import cz.klecansky.recipedb.user.io.User;
import com.vaadin.hilla.Endpoint;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import java.util.Optional;

@Endpoint
@AnonymousAllowed
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class UserEndpoint {

    @NonNull AuthenticatedUser authenticatedUser;

    public Optional<User> getAuthenticatedUser() {
        return authenticatedUser.get();
    }
}
