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

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * WebSecurityConfig for configurations of Beans and called prior to the Controller
 */
@Configuration
public class WebSecurityConfig {

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
                // Basic authentication is used
                .httpBasic(withDefaults());

        return http.build();
    }
}
