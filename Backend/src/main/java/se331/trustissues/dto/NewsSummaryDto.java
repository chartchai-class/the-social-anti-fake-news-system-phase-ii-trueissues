package se331.trustissues.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @Builder @AllArgsConstructor @NoArgsConstructor
public class NewsSummaryDto {
    Long id;
    String title;
    String shortDetail;
    String status;
    String reporter;
    LocalDateTime reportedAt;
    String imageUrl;
    Integer voteCount;
}
