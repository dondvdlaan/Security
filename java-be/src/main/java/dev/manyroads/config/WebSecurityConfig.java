package dev.manyroads.config;

import dev.manyroads.filter.RequestHeaderFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.security.config.Customizer.withDefaults;

/**
 * WebSecurityConfig for configurations of Beans and called prior to the Controller
 */
@Configuration
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // SpEL expression
        String authExpression =
                """
                hasAuthority("WRITE") and
                !hasAuthority("DELETE")
                """;

        http
               //.securityMatchers((matchers) -> matchers
               //         .requestMatchers("/javaBE/**"))
               // .authorizeHttpRequests((authorize) -> authorize
               //         .anyRequest().authenticated())
                .csrf(withDefaults())
                .csrf(csrf ->
                        csrf
                                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                )
                //.csrf((csrf) -> csrf.disable())
                .cors(withDefaults())
                //.addFilterBefore(new RequestHeaderFilter(), BasicAuthenticationFilter.class)
                // Basic authentication is used with base64 encoding
                .httpBasic(withDefaults())
                //.authorizeHttpRequests(a -> a.anyRequest().hasAuthority("READ"));
                //.authorizeHttpRequests(a ->
                //        a
                //                .anyRequest()
                //                .access(new WebExpressionAuthorizationManager(authExpression)));
                    .authorizeHttpRequests(a-> a
                    .requestMatchers(HttpMethod.GET, "/javaBE/auth").hasRole("ADMIN")
                    .requestMatchers(GET, "/javaBE/greeting").hasRole("USER")
                    .requestMatchers(POST, "/javaBE/lijntje").hasRole("USER")
                    .requestMatchers(POST, "/javaBE/lijntje/{code:^[a-z]\\d[a-z]\\.com}").hasRole("USER")
                    .requestMatchers("/javaBE/**").authenticated()
                        .anyRequest().denyAll()
                );
                //.authorizeHttpRequests(a-> a.anyRequest().hasRole("ADMIN"));
                //.formLogin(withDefaults());

        return http.build();
    }
}
