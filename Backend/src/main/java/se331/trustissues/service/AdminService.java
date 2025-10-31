package se331.trustissues.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se331.trustissues.entity.Role;

@Service
@RequiredArgsConstructor
public class AdminService {
    final NewsService newsService;
    final VoteService voteService;
    final UserService userService;

    public void removeNews(Long newsId) {
        newsService.softRemoveNews(newsId);
    }

    public void removeVote(Long voteId) {
        voteService.removeVote(voteId);
    }

    public void setUserRole(Long userId, Role role) {
        userService.updateRole(userId, role);
    }
}
