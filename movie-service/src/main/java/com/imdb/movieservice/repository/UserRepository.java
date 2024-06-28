package com.imdb.movieservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.imdb.movieservice.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByEmail(String email);

	Optional<UserEntity> findByUsername(String username);

	Optional<UserEntity> findByEmailOrUsername(String email, String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
}
