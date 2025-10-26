package se331.trustissues.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import se331.trustissues.entity.Comment;
import se331.trustissues.entity.News;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    Page<Comment> getCommentsByNews(Long newsId, Pageable pageable);
    Comment addComment(News news, Comment comment);
    Optional<Comment> findById(Long id);
    void removeComment(Long id);
    List<Comment> getAllComments();

}
