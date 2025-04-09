package cz.klecansky.recipedb.user.io;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.jspecify.annotations.NonNull;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "app_user")
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserEntity {

    @Id
    @Column(name = "id", nullable = false)
    @EqualsAndHashCode.Include
    @NonNull
    UUID id;

    @NonNull
    @Column(unique = true)
    String username;

    @JsonIgnore
    String hashedPassword;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @NonNull
    Set<Role> roles;
}
