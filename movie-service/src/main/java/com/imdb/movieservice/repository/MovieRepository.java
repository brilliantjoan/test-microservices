package com.imdb.movieservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.imdb.movieservice.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
	@Query(value = "SELECT * FROM movie m WHERE LOWER(m.title) LIKE %?1%", nativeQuery = true)
	List<Movie> findByTitleWithQuery(String title);

	List<Movie> findAllByOrderByCreatedAtDesc();
}
