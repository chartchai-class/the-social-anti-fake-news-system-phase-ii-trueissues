package se331.trustissues.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewsDto {
    Long id;
    String title;
    String shortDetail;
    String fullDetail;
    String status;
    String reporter;
    String imageUrl;
    Long userId;
}
