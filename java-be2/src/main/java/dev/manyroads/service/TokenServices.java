package dev.manyroads.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import dev.manyroads.controller.JWTController;
import dev.manyroads.model.InMemoryToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class TokenServices {

    private static Logger logger = Logger.getLogger(TokenServices.class.getName());
    private final String secret;
    private final int tokenDuration;

    public TokenServices(
            @Value("${secret}")
            String secret,
            @Value("${tokenDuration}")
            int tokenDuration
    ) {
        this.secret = secret;
        this.tokenDuration = tokenDuration;
    }

    public String createToken(String username, int tokenCounter){

        String token = "<nothingToSeeHere>";

        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            token = JWT.create()
                    .withIssuer("auth0")
                    .withExpiresAt(new Date(System.currentTimeMillis() + tokenDuration * 1000))
                    .withClaim("tokenCounter", tokenCounter )
                    .sign(algorithm);
        } catch (JWTCreationException ex){
            logger.log(Level.SEVERE, "Failed creating token: " + ex.getMessage());
        }

    return token;
    }
}
