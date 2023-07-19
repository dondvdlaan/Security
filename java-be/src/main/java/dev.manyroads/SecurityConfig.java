package dev.manyroads;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Base64;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * SecurityConfig is configuration Bean for Spring Security and called prior to the Controller
 */
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
               .securityMatchers((matchers) -> matchers
                        .requestMatchers("/javaBE/auth/**"))
                .authorizeHttpRequests((authorize) -> authorize
                        .anyRequest().authenticated())
                 /*
                .csrf((csrf) -> csrf.disable())
                 */
                .cors(withDefaults())
                .httpBasic(withDefaults());

        return http.build();
    }
    @Bean
    public UserDetailsService testOnlyUsers(PasswordEncoder passwordEncoder) {

        User.UserBuilder users = User.builder();
        UserDetails testUser = users
                .username("testUserJava")
                .password(passwordEncoder.encode("testPWJava"))
                .roles() // No roles for now
                .build();

        return new InMemoryUserDetailsManager(testUser);
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
