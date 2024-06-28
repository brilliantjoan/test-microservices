package com.imdb.authservice.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.imdb.authservice.entity.UserEntity;
import com.imdb.authservice.exception.UserNotFoundException;
import com.imdb.authservice.model.LoginRequest;
import com.imdb.authservice.model.RegisterRequest;
import com.imdb.authservice.model.UserWithTokenResponse;
import com.imdb.authservice.repository.UserRepository;
import com.imdb.authservice.security.JwtUtils;

@Service
public class AuthService {

	BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

	@Autowired
	private UserRepository repository;

	@Autowired
	private JwtUtils jwtUtils;

	public Optional<UserEntity> getUserByEmail(String email) {
		return repository.findByEmail(email);
	}

	public Optional<UserEntity> getUserByUsername(String username) {
		return repository.findByUsername(username);
	}

	public UserWithTokenResponse loginUser(LoginRequest request) {
		UserEntity user = this.getUserByEmail(request.getEmail()).get();

		if (user == null)
			throw new UserNotFoundException("email doesn't exist");

		boolean matchPassword = bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword());

		if (matchPassword == false)
			throw new UserNotFoundException("invalid credentials");

		String token = jwtUtils.generateToken(user);

		UserWithTokenResponse loginUser = new UserWithTokenResponse();

		BeanUtils.copyProperties(user, loginUser);
		loginUser.setToken(token);

		return loginUser;
	}

	public UserEntity getUserDataFromToken(String token) {
		String username = jwtUtils.getUsernameFromToken(token);

		if (username == "")
			throw new UserNotFoundException("invalid token or expired");

		return this.getUserByUsername(username).get();
	}

	public UserWithTokenResponse registerUser(RegisterRequest request) {
		Optional<UserEntity> user = repository.findByEmailOrUsername(request.getEmail(), request.getUsername());

		if (!user.isEmpty())
			throw new UserNotFoundException("email or username already exist");

		UserEntity createNewUser = new UserEntity();

		BeanUtils.copyProperties(request, createNewUser);

		String hashedPass = bCryptPasswordEncoder.encode(request.getPassword());

		createNewUser.setPassword(hashedPass);

		UserEntity createdUser = repository.save(createNewUser);

		String token = jwtUtils.generateToken(createdUser);

		UserWithTokenResponse registerUserResponse = new UserWithTokenResponse();

		BeanUtils.copyProperties(createdUser, registerUserResponse);
		registerUserResponse.setToken(token);

		return registerUserResponse;
	}
}
