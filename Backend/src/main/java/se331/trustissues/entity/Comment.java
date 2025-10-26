package se331.trustissues.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(length = 2000)
    String content;

    LocalDateTime createdAt;

    @Column(nullable = false)
    Boolean removed = false;

    @ManyToOne
    @JoinColumn(name = "news_id")
    News news;
    String imageUrl;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
