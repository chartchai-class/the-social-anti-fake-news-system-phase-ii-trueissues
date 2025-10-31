package se331.trustissues.repository;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import se331.trustissues.entity.Vote;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {


    Page<Vote> findByNewsIdAndRemovedFalse(Long newsId, Pageable pageable);
    List<Vote> findByNewsIdAndRemovedFalse(Long newsId);
    long countByNewsIdAndRemovedFalse(Long newsId);
    long countByNewsIdAndRemovedFalseAndType(Long newsId, String type);
    @Query("""
    SELECT DISTINCT v
    FROM Vote v
    LEFT JOIN FETCH v.user u
    LEFT JOIN FETCH v.news n
    WHERE v.removed IS NULL OR v.removed = false
    ORDER BY v.createdAt DESC
    """)
    List<Vote> findAllWithUserAndNews();


}
