package se331.trustissues.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    Long id;
    String content;
    LocalDateTime createdAt;
    String imageUrl;

    Long userId;
    String userName;
    Long newsId;
    String voteType;
}
