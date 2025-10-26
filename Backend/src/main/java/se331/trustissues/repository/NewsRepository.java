package se331.trustissues.repository;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import se331.trustissues.entity.News;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    @Query("""
    SELECT n FROM News n
    WHERE (:status = 'all' OR LOWER(REPLACE(n.status, '_', '-')) = LOWER(REPLACE(:status, '_', '-')))
      AND (LOWER(n.title) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(n.shortDetail) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(n.reporter) LIKE LOWER(CONCAT('%', :q, '%')))
      AND (n.removed IS NULL OR n.removed = false)
    """)
    Page<News> search(@Param("status") String status,
                      @Param("q") String q,
                      Pageable pageable);

}
