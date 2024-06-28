package com.imdb.authservice.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.imdb.authservice.entity.UserEntity;
import com.imdb.authservice.model.LoginRequest;
import com.imdb.authservice.model.RegisterRequest;
import com.imdb.authservice.model.UserWithTokenResponse;
import com.imdb.authservice.response.ResponseHandler;
import com.imdb.authservice.service.AuthService;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "*")
public class AuthController {

	@Autowired
	private AuthService service;

	@PostMapping("/login")
	public ResponseEntity<Object> login(@Valid @RequestBody LoginRequest request) {
		try {
			UserWithTokenResponse user = service.loginUser(request);

			return ResponseHandler.generateResponse("success", HttpStatus.OK, user);
		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}

	@GetMapping("/authenticate")
	public ResponseEntity<Object> login(@RequestHeader("Authorization") String token) {
		try {
			UserEntity user = service.getUserDataFromToken(token.substring(7));

			return ResponseHandler.generateResponse("success", HttpStatus.OK, user);
		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}

	}

	@PostMapping("/register")
	public ResponseEntity<Object> register(@Valid @RequestBody RegisterRequest request) {
		try {
			UserWithTokenResponse user = service.registerUser(request);

			return ResponseHandler.generateResponse("success", HttpStatus.OK, user);
		} catch (Exception e) {
			return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
}
