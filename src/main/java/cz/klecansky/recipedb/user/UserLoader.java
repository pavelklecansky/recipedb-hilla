package cz.klecansky.recipedb.user;

import cz.klecansky.recipedb.user.io.Role;
import cz.klecansky.recipedb.user.io.User;
import cz.klecansky.recipedb.user.io.UserRepository;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Component
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class UserLoader implements ApplicationRunner {

    @NonNull UserRepository userRepository;
    @NonNull PasswordEncoder passwordEncoder;

    public void run(ApplicationArguments args) {
        System.out.println("Create users");
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setUsername("user");
        user.setRoles(Set.of(Role.USER));
        user.setHashedPassword(passwordEncoder.encode("user"));
        try {
            userRepository.save(user);
        } catch (Exception e) {
            System.out.println("User already created");
        }

        User admin = new User();
        admin.setId(UUID.randomUUID());
        admin.setUsername("admin");
        admin.setRoles(Set.of(Role.USER, Role.ADMIN));
        admin.setHashedPassword(passwordEncoder.encode("admin"));
        try {
            userRepository.save(admin);
        } catch (Exception e) {
            System.out.println("Admin already created");
        }
    }

}
