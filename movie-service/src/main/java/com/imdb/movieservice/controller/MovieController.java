package com.imdb.movieservice.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.imdb.movieservice.model.Movie;
import com.imdb.movieservice.response.ResponseHandler;
import com.imdb.movieservice.service.MovieService;

@RestController
@RequestMapping("/movie")
//@CrossOrigin(origins = "*")
@Validated
public class MovieController {

	@Autowired
	private MovieService service;

	@GetMapping()
	public ResponseEntity<Object> getAllMovie() {
		try {
			List<Movie> movies = service.getAllMovie();
			return ResponseHandler.generateResponse("success", HttpStatus.OK, movies);
		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> getMovieById(@PathVariable int id) {
		try {
			Movie movie = service.getMovieById(id);
			return ResponseHandler.generateResponse("success", HttpStatus.OK, movie);
		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}

	@GetMapping("/search")
	public ResponseEntity<Object> getMovieById(@RequestParam String title) {
		try {
			List<Movie> movies = service.searchMovieByTitle(title);
			return ResponseHandler.generateResponse("success", HttpStatus.OK, movies);
		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}

	@PostMapping()
	public ResponseEntity<Object> insertNewMovie(@Valid @RequestBody Movie movie) {
		try {
			Movie savedMovie = service.insertNewMovie(movie);
			return ResponseHandler.generateResponse("success", HttpStatus.CREATED, savedMovie);
		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}

	}

	@PutMapping("/{id}")
	public ResponseEntity<Object> updateExistingMovie(@Valid @PathVariable int id, @RequestBody Movie movie) {
		try {
			Movie savedMovie = service.updateMovie(id, movie);
			return ResponseHandler.generateResponse("success", HttpStatus.OK, savedMovie);
		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteMovie(@PathVariable int id) {
		try {
			service.deleteMovie(id);
			return ResponseHandler.generateResponse("success", HttpStatus.OK, null);
		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
}
