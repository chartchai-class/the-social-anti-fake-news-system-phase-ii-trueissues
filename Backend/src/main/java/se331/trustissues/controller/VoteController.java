package se331.trustissues.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import se331.trustissues.dto.VoteDto;
import se331.trustissues.entity.News;
import se331.trustissues.entity.User;
import se331.trustissues.entity.Vote;
import se331.trustissues.service.NewsService;
import se331.trustissues.service.UserService;
import se331.trustissues.service.VoteService;
import se331.trustissues.util.LabMapper;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/votes")
public class VoteController {
    final VoteService voteService;
    final NewsService newsService;
    final UserService userService;
    final LabMapper mapper;

    @GetMapping("/news/{newsId}")
    public ResponseEntity<List<VoteDto>> getVotesByNews(@PathVariable Long newsId) {
        List<Vote> votes = voteService.getVotesByNews(newsId);
        return ResponseEntity.ok(votes.stream().map(mapper::toVoteDto).toList());
    }

    @PostMapping("/news/{newsId}")
    public ResponseEntity<VoteDto> addVote(@PathVariable Long newsId, @RequestBody VoteDto payload) {
        News news = newsService.findById(newsId).orElseThrow();
        User user = payload.getUserId() != null
                ? userService.findById(payload.getUserId()).orElse(null)
                : null;

        Vote vote = Vote.builder()
                .news(news)
                .user(user)
                .type(payload.getType())
                .comment(payload.getComment())
                .imageUrl(payload.getImageUrl())
                .createdAt(LocalDateTime.now())
                .removed(false)
                .build();

        Vote saved = voteService.addVote(news, vote);
        System.out.println("✅ New vote added for newsId=" + newsId +
                " by user=" + (user != null ? user.getName() : "unknown"));

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(mapper.toVoteDto(saved));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVote(@PathVariable Long id) {
        voteService.deleteVote(id);
        return ResponseEntity.noContent().build();
    }
}
