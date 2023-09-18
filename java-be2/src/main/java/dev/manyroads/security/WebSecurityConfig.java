package dev.manyroads.security;

import dev.manyroads.filter.TokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class WebSecurityConfig {
    @Autowired
    TokenFilter tokenFilter;
    @Bean
    public SecurityFilterChain config(HttpSecurity http) throws Exception{


        CorsConfigurationSource sourceCORS = request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(
                    List.of("http://localhost:3005"));
            config.setAllowedMethods(
                    List.of("GET", "POST", "PUT", "DELETE"));
            config.setAllowedHeaders(List.of("*"));
            config.setExposedHeaders(List.of("X-ACCESS-TOKEN", "X-REFRESH-TOKEN"));
            return config;
        };

        http
                .cors(c -> c.configurationSource(sourceCORS))
                .csrf(c->c.disable())
                .addFilterAfter(tokenFilter, BasicAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .authorizeHttpRequests(a -> a.requestMatchers("/inloggen").authenticated())
                .authorizeHttpRequests(a -> a.requestMatchers("/refresh").authenticated())
                .authorizeHttpRequests(a -> a.requestMatchers("/test").permitAll());
        //.authorizeHttpRequests(a->a.anyRequest().permitAll());

        return http.build();
    }
}
