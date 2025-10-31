package se331.trustissues.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;
import se331.trustissues.entity.News;
import se331.trustissues.entity.Vote;
import se331.trustissues.repository.NewsRepository;
import se331.trustissues.repository.VoteRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsService {
    final NewsRepository newsRepo;
    final VoteRepository voteRepo;

    public Page<News> search(String status, String q, int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page - 1, 0), size, Sort.by("createdAt").descending());
        Page<News> result = newsRepo.search(
                status == null ? "all" : status,
                q == null ? "" : q,
                pageable
        );
        System.out.println("DEBUG → find total=" + result.getTotalElements() + ", pageSize=" + result.getContent().size());
        return result;
    }

    public Optional<News> findById(Long id) {
        return newsRepo.findById(id).filter(n -> n.getRemoved() == null || !n.getRemoved());
    }


    @Transactional
    public void recomputeStatus(Long newsId) {
        doRecompute(newsId);
    }


    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void recomputeStatusNewTx(Long newsId) {
        doRecompute(newsId);
    }

    private void doRecompute(Long newsId) {
        List<Vote> votes = voteRepo.findByNewsIdAndRemovedFalse(newsId);

        long fakeCount = votes.stream()
                .filter(v -> v.getType() != null && v.getType().equalsIgnoreCase("FAKE"))
                .count();

        long notFakeCount = votes.stream()
                .filter(v -> v.getType() != null &&
                        (v.getType().equalsIgnoreCase("NOT_FAKE") || v.getType().equalsIgnoreCase("NOT-FAKE")))
                .count();

        newsRepo.findById(newsId).ifPresent(n -> {
            String newStatus;
            if (fakeCount == 0 && notFakeCount == 0) {
                newStatus = "UNCERTAIN";
            } else if (fakeCount == notFakeCount) {
                newStatus = "UNCERTAIN"; // ⚖️ กรณีคะแนนเท่ากัน
            } else if (notFakeCount > fakeCount) {
                newStatus = "NOT_FAKE";
            } else {
                newStatus = "FAKE";
            }

            n.setStatus(newStatus);
            newsRepo.saveAndFlush(n);

            // 🌈 Log สวยดูง่าย
            final String GREEN = "\u001B[32m";
            final String RED = "\u001B[31m";
            final String YELLOW = "\u001B[33m";
            final String RESET = "\u001B[0m";

            String color = switch (newStatus) {
                case "FAKE" -> RED;
                case "NOT_FAKE" -> GREEN;
                default -> YELLOW;
            };

            System.out.println(color + "🧮 News[" + n.getId() + "] → " + newStatus +
                    " (fake=" + fakeCount + ", notFake=" + notFakeCount + ")" + RESET);
        });
    }

    @Transactional
    public void softRemoveNews(Long id) {
        newsRepo.findById(id).ifPresent(n -> n.setRemoved(true));
    }

    @Transactional
    public News save(News news) {
        return newsRepo.save(news);
    }
}
