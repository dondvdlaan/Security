package dev.manyroads.model;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.ApplicationScope;

public record InMemoryToken(
        String username,
        String token,
        int duration,
        String refreshToken) {
}
