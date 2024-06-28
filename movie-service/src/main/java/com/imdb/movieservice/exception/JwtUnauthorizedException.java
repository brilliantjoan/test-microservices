package com.imdb.movieservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
public class JwtUnauthorizedException extends RuntimeException {
	public JwtUnauthorizedException(String message) {
		super(message);
	}
}
