
package com.weddingvendor.repository;

import com.weddingvendor.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndRole(String email, String role);
    boolean existsByEmail(String email);
}
