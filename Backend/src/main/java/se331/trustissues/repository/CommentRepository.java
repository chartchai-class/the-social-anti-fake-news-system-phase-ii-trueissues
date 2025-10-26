package se331.trustissues.repository;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import se331.trustissues.entity.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByNewsIdAndRemovedFalse(Long newsId, Pageable pageable);
    List<Comment> findByRemovedFalse();
}
