package cz.klecansky.recipedb.user;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.spring.security.AuthenticationContext;
import cz.klecansky.recipedb.security.AuthenticatedUser;
import cz.klecansky.recipedb.user.io.User;
import dev.hilla.Endpoint;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.security.PermitAll;
import java.security.Principal;
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
