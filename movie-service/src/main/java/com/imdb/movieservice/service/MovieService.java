package com.imdb.movieservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.imdb.movieservice.exception.MovieNotFoundException;
import com.imdb.movieservice.model.Movie;
import com.imdb.movieservice.repository.MovieRepository;

@Service
public class MovieService {

	@Autowired
	private MovieRepository repository;

	public List<Movie> getAllMovie() {
		List<Movie> movies = repository.findAllByOrderByCreatedAtDesc();
		return movies;
	}

	public Movie getMovieById(int id) {
		Optional<Movie> movie = repository.findById((long) id);

		if (movie.isEmpty())
			throw new MovieNotFoundException("movie with id " + id + " not found");

		return movie.get();
	}

	public List<Movie> searchMovieByTitle(String title) {
		List<Movie> movies = repository.findByTitleWithQuery(title.toLowerCase());

		return movies;
	}

	public Movie insertNewMovie(Movie movie) {
		return repository.save(movie);
	}

	public Movie updateMovie(int id, Movie movie) {
		Movie movieDetail = this.getMovieById(id);

		movieDetail.setTitle(movie.getTitle());
		movieDetail.setCoverImage(movie.getCoverImage());
		movieDetail.setDescription(movie.getDescription());
		movieDetail.setDirector(movie.getDirector());
		movieDetail.setLanguage(movie.getLanguage());
		movieDetail.setReleaseDate(movie.getReleaseDate());
		movieDetail.setRating(movie.getRating());
		movieDetail.setUpdatedAt(LocalDateTime.now());

		return repository.save(movieDetail);
	}

	public void deleteMovie(int id) {
		try {
			repository.deleteById((long) id);
		} catch (Exception e) {
			throw new MovieNotFoundException("movie with id " + id + " not found");
		}
	}
}
