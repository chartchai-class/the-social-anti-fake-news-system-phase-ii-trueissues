package se331.trustissues.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import se331.trustissues.entity.*;
import se331.trustissues.repository.*;
import se331.trustissues.service.NewsService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class DataInit {
    final UserRepository userRepository;
    final NewsRepository newsRepository;
    final VoteRepository voteRepository;
    final NewsService newsService;

    @PostConstruct
    public void init() {
        if (userRepository.count() == 0) {

            User admin = User.builder()
                    .name("Alice Admin")
                    .email("admin@trustissues.com")
                    .role(Role.ADMIN)
                    .passwordHash("admin123")
                    .profileImageUrl("https://i.pravatar.cc/150?img=1")
                    .build();

            User member = User.builder()
                    .name("Bob Member")
                    .email("member@trustissues.com")
                    .role(Role.MEMBER)
                    .passwordHash("member123")
                    .profileImageUrl("https://i.pravatar.cc/150?img=2")
                    .build();

            User reader = User.builder()
                    .name("Charlie Reader")
                    .email("reader@trustissues.com")
                    .role(Role.READER)
                    .passwordHash("reader123")
                    .profileImageUrl("https://i.pravatar.cc/150?img=3")
                    .build();

            userRepository.saveAll(List.of(admin, member, reader));


            Random rand = new Random();

            for (int i = 1; i <= 30; i++) {
                User reporter = (i % 2 == 0) ? admin : member;

                News news = News.builder()
                        .title("Breaking News " + i)
                        .shortDetail("Short detail for news #" + i)
                        .fullDetail("Full detailed content of news #" + i +
                                ". This is mock data for testing pagination, voting, and recompute logic.")
                        .reporter(reporter.getName())
                        .status("UNCERTAIN") // ✅ เริ่มต้นกลาง
                        .createdAt(LocalDateTime.now().minusDays(i))
                        .createdBy(reporter)
                        .imageUrl("https://picsum.photos/seed/news" + i + "/400/200")
                        .removed(false)
                        .build();

                newsRepository.save(news);


                int voteCount = 1 + rand.nextInt(4);
                for (int v = 0; v < voteCount; v++) {
                    boolean isFake = rand.nextBoolean();

                    Vote vote = Vote.builder()
                            .comment(isFake ? "This looks suspicious." : "Looks real to me.")
                            .type(isFake ? "FAKE" : "NOT_FAKE")
                            .createdAt(LocalDateTime.now().minusMinutes(rand.nextInt(1500)))
                            .user(reader)
                            .news(news)
                            .removed(false)
                            .build();

                    voteRepository.save(vote);
                }


                newsService.recomputeStatus(news.getId());
            }


            List<News> allNews = newsRepository.findAll();
            allNews.forEach(n -> newsService.recomputeStatus(n.getId()));

            System.out.println("✅ Mock data created: 30 news + recomputed all statuses correctly (FAKE / NOT_FAKE / UNCERTAIN).");
        }
    }
}
