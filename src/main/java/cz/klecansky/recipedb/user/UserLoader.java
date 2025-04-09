package cz.klecansky.recipedb.user;

import cz.klecansky.recipedb.user.io.Role;
import cz.klecansky.recipedb.user.io.UserEntity;
import cz.klecansky.recipedb.user.io.UserRepository;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.UUID;

@Component
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
@Slf4j
public class UserLoader implements ApplicationRunner {

    @NonNull UserRepository userRepository;
    @NonNull PasswordEncoder passwordEncoder;

    public void run(ApplicationArguments args) {
        log.info("Create demo users");
        UserEntity userEntity = new UserEntity();
        userEntity.setId(UUID.randomUUID());
        userEntity.setUsername("user");
        userEntity.setRoles(Set.of(Role.USER));
        userEntity.setHashedPassword(passwordEncoder.encode("user"));
        try {
            userRepository.save(userEntity);
        } catch (Exception e) {
            log.info("User already created");
        }

        UserEntity admin = new UserEntity();
        admin.setId(UUID.randomUUID());
        admin.setUsername("admin");
        admin.setRoles(Set.of(Role.USER, Role.ADMIN));
        admin.setHashedPassword(passwordEncoder.encode("admin"));
        try {
            userRepository.save(admin);
        } catch (Exception e) {
            log.info("Admin already created");
        }
    }

}
