package se331.trustissues.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se331.trustissues.entity.News;
import se331.trustissues.entity.Vote;
import se331.trustissues.repository.VoteRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VoteService {
    final VoteRepository voteRepo;
    final NewsService newsService;


    public Page<Vote> listByNews(Long newsId, int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page - 1, 0), size, Sort.by("createdAt").descending());
        return voteRepo.findByNewsIdAndRemovedFalse(newsId, pageable);
    }


    @Transactional
    public Vote addVote(News news, Vote vote) {
        vote.setNews(news);
        vote.setRemoved(false);
        vote.setCreatedAt(LocalDateTime.now());

        Vote saved = voteRepo.save(vote);


        if (news != null && news.getId() != null) {
            newsService.recomputeStatus(news.getId());
            System.out.println("🧮 Recomputed after new vote for newsId=" + news.getId());
        }

        return saved;
    }


    @Transactional
    public void removeVote(Long voteId) {
        voteRepo.findById(voteId).ifPresent(v -> {
            v.setRemoved(true);
            voteRepo.save(v);
            System.out.println("🗑 Vote ID=" + voteId + " marked as removed.");

            if (v.getNews() != null) {
                newsService.recomputeStatus(v.getNews().getId());
                System.out.println("🧮 Recomputed after vote removed for newsId=" + v.getNews().getId());
            }
        });
    }


    public List<Vote> getAllVotes() {
        var list = voteRepo.findAll();
        System.out.println("📊 getAllVotes() -> " + list.size());
        return list;
    }

    public List<Vote> getVotesByNews(Long newsId) {
        return voteRepo.findByNewsIdAndRemovedFalse(newsId);
    }


    @Transactional
    public void deleteVote(Long id) {
        voteRepo.deleteById(id);
    }
}
