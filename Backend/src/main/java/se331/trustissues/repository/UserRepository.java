package se331.trustissues.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se331.trustissues.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
