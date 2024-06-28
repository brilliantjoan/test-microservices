package com.imdb.authservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.imdb.authservice.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByEmail(String email);

	Optional<UserEntity> findByUsername(String username);

	Optional<UserEntity> findByEmailOrUsername(String email, String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
}
