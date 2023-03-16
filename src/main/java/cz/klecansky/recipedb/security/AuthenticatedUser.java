package cz.klecansky.recipedb.security;

import com.vaadin.flow.spring.security.AuthenticationContext;
import cz.klecansky.recipedb.user.io.User;
import cz.klecansky.recipedb.user.io.UserRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuthenticatedUser {

    private final UserRepository userRepository;
    private final AuthenticationContext authenticationContext;

    public AuthenticatedUser(AuthenticationContext authenticationContext, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.authenticationContext = authenticationContext;
    }

    public Optional<User> get() {
        return authenticationContext.getAuthenticatedUser(Jwt.class)
                .map(userDetails -> userRepository.findUserByUsername(userDetails.getSubject()));
    }

    public void logout() {
        authenticationContext.logout();
    }

}
