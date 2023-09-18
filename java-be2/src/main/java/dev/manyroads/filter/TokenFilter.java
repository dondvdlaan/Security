package dev.manyroads.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.ILoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
public class TokenFilter extends OncePerRequestFilter {

    private static final Logger logger = Logger.getLogger(TokenFilter.class.getName());

    @Value("${secret}")
    String secret;
    @Value("${tokenDuration}")
    int tokenDuration;

    @Override
    protected void doFilterInternal(
            HttpServletRequest req,
            HttpServletResponse res,
            FilterChain filterChain)
            throws ServletException, IOException {
        {

            logger.info("X-ACCESS-TOKEN: " + req.getHeader("X-ACCESS-TOKEN"));

            /*
            Verifying Token
             */
            DecodedJWT decodedJWT;
            String token = "geheimpje";
            try {
                if (!req.getHeader("X-ACCESS-TOKEN").isBlank()){
                    token = req.getHeader("X-ACCESS-TOKEN");
                }
                Algorithm algorithm = Algorithm.HMAC256(secret);

                JWTVerifier verifier = JWT.require(algorithm)
                        // specify an specific claim validations
                        .withIssuer("auth0")
                        // reusable verifier instance
                        .build();

                decodedJWT = verifier.verify(token);
                logger.info("decodedJWT: " + decodedJWT);

                Date expireDateToken = decodedJWT.getExpiresAt();
                logger.info("expireDateToken: " + expireDateToken);
                Claim tokenCounter = decodedJWT.getClaim("tokenCounter");
                logger.info("expireDateToken: " + expireDateToken);

            } catch (JWTVerificationException ex){
                logger.log(Level.SEVERE, "Token Breached: " +  ex.getMessage());
                res.setStatus(HttpServletResponse.SC_FORBIDDEN);
            }

            filterChain.doFilter(req, res);
        }
    }

    /**
     * Filter shall only apply to check JWT token, not during Login or refresh requests
     * @param request
     * @return
     * @throws ServletException
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        String shouldNotFilterHeader = request.getHeader("SHOULD_NOT_FILTER");
        logger.info("shouldNotFilterHeader: " + shouldNotFilterHeader);

        Boolean shouldNotFilter = shouldNotFilterHeader.equalsIgnoreCase("true");
        logger.info("shouldNotFilter: " + shouldNotFilter);

        return shouldNotFilter;
        //return Boolean.TRUE.equals(request.getHeader("SHOULD_NOT_FILTER"));
    }

}
