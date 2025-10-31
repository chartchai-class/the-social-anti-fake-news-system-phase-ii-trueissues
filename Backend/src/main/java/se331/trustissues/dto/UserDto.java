package se331.trustissues.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    Long id;
    String name;
    String email;
    String role;
    String profileImageUrl;
}
