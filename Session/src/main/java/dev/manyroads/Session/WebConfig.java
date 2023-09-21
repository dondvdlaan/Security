package dev.manyroads.Session;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    /*
    Set variables for CORS
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {

        WebMvcConfigurer webMvcConfigurer = new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                        .addMapping("/**")
                        .allowedOrigins("http://localhost:3005")
                        .allowCredentials(true)
                        .allowedHeaders();
            }
        };

        return webMvcConfigurer;
    }
}
