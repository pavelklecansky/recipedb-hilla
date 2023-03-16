package cz.klecansky.recipedb.user.io;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.hilla.Nonnull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "app_user")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    @Nonnull
    private UUID id;

    @Nonnull
    private String username;
    @JsonIgnore
    private String hashedPassword;
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @Nonnull
    private Set<Role> roles;
}
