package cz.klecansky.recipedb.security;

import com.vaadin.flow.spring.security.AuthenticationContext;
import cz.klecansky.recipedb.user.io.UserEntity;
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

    public Optional<UserEntity> get() {
        return authenticationContext.getAuthenticatedUser(Jwt.class)
                .map(userDetails -> userRepository.findUserByUsername(userDetails.getSubject()));
    }

    public void logout() {
        authenticationContext.logout();
    }

}
