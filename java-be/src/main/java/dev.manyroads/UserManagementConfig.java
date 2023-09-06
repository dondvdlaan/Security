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
 * UserManagementConfig for configuration of Beans related to users, called prior to the Controller
 * and intercepts the requests
 */
@Configuration
public class UserManagementConfig {

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
