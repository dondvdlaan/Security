package dev.manyroads.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * UserManagementConfig for configuration of Beans related to users, called prior to the Controller
 * and intercepts the requests
 */
@Configuration
public class UserManagementConfig {

    @Bean
    public UserDetailsService testOnlyUsers(PasswordEncoder passwordEncoder) {

        UserDetails testUser = User
                .withUsername("test")
                .password(passwordEncoder.encode("testPW"))
                .roles("ADMIN")
                //.authorities("ROLE_ADMIN")
                //.authorities("WRITE", "DELETE")
                //.roles() // No roles for now
                .build();
        UserDetails testUser2 = User
                .withUsername("test2")
                .password(passwordEncoder.encode("testPW2"))
                .roles("USER")
                //.authorities("ROLE_USER")
                //.authorities("READ")
                //.roles() // No roles for now
                .build();

        return new InMemoryUserDetailsManager(testUser, testUser2);
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        // Storing PW encode with BCrypt
        return new BCryptPasswordEncoder();
        //return NoOpPasswordEncoder.getInstance();
    }
}
