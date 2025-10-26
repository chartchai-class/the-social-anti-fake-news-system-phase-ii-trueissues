package se331.trustissues.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se331.trustissues.dto.UserDto;
import se331.trustissues.entity.Role;
import se331.trustissues.entity.User;
import se331.trustissues.service.UserService;
import se331.trustissues.util.LabMapper;

@RestController @RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    final UserService userService;
    final LabMapper mapper;


    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto dto) {
        User u = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .profileImageUrl(dto.getProfileImageUrl())
                .role(Role.READER)
                .build();

        return ResponseEntity.ok(
                mapper.toUserDto(userService.registerReader(u))
        );
    }


}
