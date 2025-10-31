package se331.trustissues.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se331.trustissues.entity.Comment;
import se331.trustissues.entity.News;
import se331.trustissues.repository.CommentRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    final CommentRepository commentRepo;

    @Override
    public Page<Comment> getCommentsByNews(Long newsId, Pageable pageable) {
        return commentRepo.findByNewsIdAndRemovedFalse(newsId, pageable);
    }

    @Override
    public Comment addComment(News news, Comment comment) {
        return commentRepo.save(comment);
    }

    @Override
    public Optional<Comment> findById(Long id) {
        return commentRepo.findById(id);
    }

    @Override
    public List<Comment> getAllComments() {
        return commentRepo.findByRemovedFalse();
    }


    @Override
    @Transactional
    public void removeComment(Long id) {
        commentRepo.findById(id).ifPresent(c -> {
            c.setRemoved(true);
            commentRepo.save(c);
        });
    }
}
