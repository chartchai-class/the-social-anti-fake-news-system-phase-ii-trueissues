package se331.trustissues.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class VoteDto {
    Long id;
    Long newsId;
    Long userId;
    String type;
    String comment;
    LocalDateTime createdAt;
    String userName;
    String imageUrl;

}
