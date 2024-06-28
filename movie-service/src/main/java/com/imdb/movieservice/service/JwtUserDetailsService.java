package com.imdb.movieservice.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.imdb.movieservice.model.UserEntity;
import com.imdb.movieservice.repository.UserRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		if ("admin".equals(username) || "admin@gmail.com".equals(username)) {
//			return new User("admin", "$2a$10$9OkT3tWOKgR7YRj8CzoXCOtmbDJxgtkfljo81D8Wkj2D5BBy/LQn6", new ArrayList<>());
//		} else {
//			throw new UsernameNotFoundException("User not found with username: " + username);
//		}

		UserEntity userEntity = userRepository.findByUsername(username).get();
		return new User(username, userEntity.getPassword(), new ArrayList<>());
	}
}
