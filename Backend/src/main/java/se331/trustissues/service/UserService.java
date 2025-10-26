package se331.trustissues.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se331.trustissues.entity.*;
import se331.trustissues.repository.UserRepository;

import java.util.Optional;

@Service @RequiredArgsConstructor
public class UserService {
    final UserRepository userRepo;

    public User registerReader(User u) {
        u.setRole(Role.READER);
        return userRepo.save(u);
    }

    public User updateRole(Long id, Role role) {
        User u = userRepo.findById(id).orElseThrow();
        u.setRole(role);
        return userRepo.save(u);
    }
    public Optional<User> findById(Long id) {
        return userRepo.findById(id);
    }


}
