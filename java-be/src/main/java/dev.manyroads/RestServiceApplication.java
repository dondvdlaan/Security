package dev.manyroads;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RestServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestServiceApplication.class, args);
	}
/*
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) {

		SecurityFilterChain scf = null;

		try{
			http
					// ...
					.httpBasic(withDefaults());
			scf = http.build();

		} catch(Exception e){
			System.out.println("e" + e.getMessage());
		}

		return scf;
	}
 */
}
