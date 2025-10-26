package se331.trustissues.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.transaction.annotation.Transactional; // ✅ เพิ่มบรรทัดนี้
import org.springframework.web.bind.annotation.*;
import se331.trustissues.dto.CommentDto;
import se331.trustissues.entity.*;
import se331.trustissues.repository.*;
import se331.trustissues.service.*;

import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    final UserRepository userRepository;
    final NewsRepository newsRepository;
    final VoteRepository voteRepository;

    final UserService userService;
    final VoteService voteService;

    // 🧑 Promote READER → MEMBER / ADMIN
    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> promote(@PathVariable Long id, @RequestParam("role") String newRole) {
        try {
            User updatedUser = userService.updateRole(id, Role.valueOf(newRole.toUpperCase()));
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid role or user not found.");
        }
    }

    // 🗞 Soft delete News
    @DeleteMapping("/news/{id}")
    public ResponseEntity<?> removeNews(@PathVariable Long id) {
        return newsRepository.findById(id)
                .map(n -> {
                    n.setRemoved(true);
                    newsRepository.save(n);
                    return ResponseEntity.ok("News " + id + " removed");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔁 Restore News
    @PatchMapping("/news/{id}/restore")
    public ResponseEntity<?> restoreNews(@PathVariable Long id) {
        return newsRepository.findById(id)
                .map(n -> {
                    n.setRemoved(false);
                    newsRepository.save(n);
                    return ResponseEntity.ok("News " + id + " restored");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 🗳 Delete Vote (soft delete)
    @DeleteMapping("/votes/{id}")
    public ResponseEntity<?> removeVote(@PathVariable Long id) {
        voteService.removeVote(id);
        return ResponseEntity.noContent().build();
    }

    // 💬 Get all comments & votes
    @Transactional(readOnly = true) // ✅ เพิ่มตรงนี้เพื่อให้ Hibernate ยังเปิด session ตอน map
    @GetMapping("/vote-comments")
    public ResponseEntity<?> getAllVoteComments() {

        var comments = voteRepository.findAllWithUserAndNews().stream()
                .filter(v -> !Boolean.TRUE.equals(v.getRemoved()) &&
                        v.getComment() != null && !v.getComment().isEmpty())
                .map(v -> {
                    // 🧩 Debug log
                    System.out.println("✅ DEBUG voteId=" + v.getId() +
                            " | user=" + (v.getUser() != null ? v.getUser().getName() : "null"));

                    return CommentDto.builder()
                            .id(v.getId())
                            .content(v.getComment())
                            .createdAt(v.getCreatedAt())
                            .imageUrl(v.getImageUrl())
                            .voteType(v.getType() != null ? v.getType() : "UNCERTAIN")
                            .newsId(v.getNews() != null ? v.getNews().getId() : null)
                            .userId(v.getUser() != null ? v.getUser().getId() : null)
                            .userName(
                                    v.getUser() != null && v.getUser().getName() != null
                                            ? v.getUser().getName()
                                            : "Anonymous"
                            )
                            .build();
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(comments);
    }

    // 🧾 Get all Users
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // 🧾 Get all Votes
    @GetMapping("/votes")
    public ResponseEntity<?> getAllVotes() {
        return ResponseEntity.ok(voteRepository.findAll());
    }
}
