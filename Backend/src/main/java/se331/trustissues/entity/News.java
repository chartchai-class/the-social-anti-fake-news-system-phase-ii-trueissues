package se331.trustissues.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class News {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;
    @Column(length = 800)
    String shortDetail;
    @Column(length = 5000)
    String fullDetail;


    String status = "UNCERTAIN";


    String reporter;
    LocalDateTime reportedAt;
    String imageUrl;

    @Column(nullable = false)
    Boolean removed = false;


    @Column
    LocalDateTime createdAt = LocalDateTime.now();
    @ManyToOne
    User createdBy;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Vote> votes = new ArrayList<>();
}
