package se331.trustissues.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import se331.trustissues.dto.CommentDto;
import se331.trustissues.entity.*;
import se331.trustissues.service.*;
import se331.trustissues.util.LabMapper;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CommentController {
    final CommentService commentService;
    final NewsService newsService;
    final UserService userService;
    final LabMapper mapper;


    @GetMapping("/news/{id}/comments")
    public ResponseEntity<?> getComments(
            @PathVariable Long id,
            @RequestParam(value = "_page", defaultValue = "1") Integer page,
            @RequestParam(value = "_limit", defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(Math.max(page - 1, 0), size, Sort.by("createdAt").descending());
        Page<Comment> comments = commentService.getCommentsByNews(id, pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-count", String.valueOf(comments.getTotalElements()));
        return new ResponseEntity<>(comments.getContent().stream().map(mapper::toCommentDto).toList(), headers, HttpStatus.OK);
    }


    @PostMapping("/news/{id}/comments")
    public ResponseEntity<CommentDto> addComment(@PathVariable Long id, @RequestBody CommentDto payload) {
        News news = newsService.findById(id).orElseThrow();
        User user = payload.getUserId() != null
                ? userService.findById(payload.getUserId()).orElse(null)
                : null;

        Comment c = Comment.builder()
                .content(payload.getContent())
                .imageUrl(payload.getImageUrl())
                .createdAt(LocalDateTime.now())
                .news(news)
                .user(user)
                .removed(false)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(mapper.toCommentDto(commentService.addComment(news, c)));
    }



    @GetMapping("/admin/comments")
    public ResponseEntity<?> listAllComments() {
        return ResponseEntity.ok(
                commentService.getAllComments()
                        .stream()
                        .map(mapper::toCommentDto)
                        .toList()
        );
    }

    @DeleteMapping("/admin/comments/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        commentService.removeComment(id);
        return ResponseEntity.noContent().build();
    }
}
