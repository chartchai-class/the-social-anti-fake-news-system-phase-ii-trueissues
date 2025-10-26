// ✅ backend/src/main/java/se331/trustissues/controller/NewsController.java
package se331.trustissues.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se331.trustissues.dto.*;
import se331.trustissues.entity.*;
import se331.trustissues.service.*;
import se331.trustissues.util.LabMapper;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/news")
public class NewsController {
    final NewsService newsService;
    final VoteService voteService;
    final LabMapper mapper;
    final UserService userService;


    @GetMapping
    public ResponseEntity<?> list(
            @RequestParam(value = "status", required = false, defaultValue = "all") String status,
            @RequestParam(value = "q", required = false, defaultValue = "") String q,
            @RequestParam(value = "_page", required = false, defaultValue = "1") Integer page,
            @RequestParam(value = "_limit", required = false, defaultValue = "6") Integer size
    ) {
        Page<News> out = newsService.search(status, q, page, size);
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-count", String.valueOf(out.getTotalElements()));
        return ResponseEntity.ok()
                .headers(headers)
                .body(out.getContent().stream().map(mapper::toNewsSummaryDto).toList());
    }


    @GetMapping("/{id}")
    public ResponseEntity<NewsDetailDto> get(@PathVariable Long id) {
        News n = newsService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "News not found"));
        return ResponseEntity.ok(mapper.toNewsDetailDto(n));
    }


    @PostMapping("/{id}/votes")
    public ResponseEntity<VoteDto> addVote(@PathVariable Long id, @RequestBody VoteDto payload) {
        News news = newsService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "News not found"));

        User voter = null;
        if (payload.getUserId() != null) {
            voter = userService.findById(payload.getUserId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        }


        Vote v = Vote.builder()
                .type(payload.getType())
                .comment(payload.getComment())
                .imageUrl(payload.getImageUrl())
                .createdAt(LocalDateTime.now())
                .removed(false)
                .user(voter)
                .news(news)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(mapper.toVoteDto(voteService.addVote(news, v)));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        newsService.softRemoveNews(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping
    public ResponseEntity<?> addNews(@RequestBody NewsDto payload) {
        User user = userService.findById(payload.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        News news = News.builder()
                .title(payload.getTitle())
                .shortDetail(payload.getShortDetail())
                .fullDetail(payload.getFullDetail())
                .status(payload.getStatus().toUpperCase())
                .reporter(user.getName())
                .imageUrl(payload.getImageUrl())
                .createdBy(user)
                .createdAt(LocalDateTime.now())
                .reportedAt(LocalDateTime.now())
                .removed(false)
                .build();

        newsService.save(news);
        return ResponseEntity.status(HttpStatus.CREATED).body(news);
    }
}
