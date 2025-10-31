package se331.trustissues.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @Builder @AllArgsConstructor @NoArgsConstructor
public class NewsDetailDto {
    Long id;
    String title;
    String shortDetail;
    String fullDetail;
    String status;
    String reporter;
    LocalDateTime reportedAt;
    String imageUrl;
    Integer voteCount;

}
