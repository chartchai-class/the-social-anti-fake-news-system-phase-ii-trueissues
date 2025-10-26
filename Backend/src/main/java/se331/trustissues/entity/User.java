package se331.trustissues.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "`user`")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;
    String surname;
    String email;
    String passwordHash;
    String profileImageUrl;

    @Column(columnDefinition = "TEXT")
    String profileImage;

    @Enumerated(EnumType.STRING)
    Role role = Role.READER;
}

