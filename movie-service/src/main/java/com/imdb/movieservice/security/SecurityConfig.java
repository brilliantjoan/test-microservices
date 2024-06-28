package com.imdb.movieservice.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.imdb.movieservice.exception.JwtAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig {
	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private JwtTokenFilter jwtTokenFilter;

	@Bean
	protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
		// authenticate all request
//		http.authorizeHttpRequests(auth -> auth.anyRequest().authenticated());

		// if not authenticated, popup is shown on browser
//		http.httpBasic(withDefaults());

		// csrf
//		http.csrf().disable();

		http.cors().and().csrf().disable().authorizeRequests().antMatchers(HttpMethod.GET, "/movie/**").permitAll()
				.anyRequest().authenticated().and()
				.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class).exceptionHandling()
				.authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		;

		return http.build();
	}

}
