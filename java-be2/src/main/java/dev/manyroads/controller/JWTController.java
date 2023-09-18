package dev.manyroads.controller;

import dev.manyroads.model.RefreshToken;
import dev.manyroads.model.User;
import dev.manyroads.model.User2;
import dev.manyroads.service.TokenServices;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.logging.Logger;

@RestController
//@CrossOrigin("http://localhost:3005")
public class JWTController {

    // Temporarily storage for demo
    private static String username = "<nothingToSeeHere>";
    private static String refreshToken = "refresher";
    private static int tokenCounter = 0;

    @Autowired
    TokenServices tokenServices;
    private static Logger logger = Logger.getLogger(JWTController.class.getName());

    @GetMapping(
            value = "/inloggen",
            consumes = "application/json",
            produces = "application/json")
    public ResponseEntity inloggen(HttpServletResponse res){

        SecurityContext context = SecurityContextHolder.getContext();
        Authentication a = context.getAuthentication();

        logger.info("In Inloggen ");

        String token = tokenServices.createToken(a.getName(), tokenCounter);
        // Store refreh token
        JWTController.refreshToken = "refresher" + Integer.toString(tokenCounter) ;

        // Prepare headers
        res.setHeader("X-ACCESS-TOKEN", token);
        res.setHeader("X-REFRESH-TOKEN", JWTController.refreshToken);

        // Store temporarily userDetails
        JWTController.username = a.getName();

        return ResponseEntity.ok().body("Tokens generated");
    }

    @GetMapping("/test")
    public String testen(){

        logger.info("In Test" +
                " ");

        return "Test doorstaan!!";
    }
    @PostMapping(
            value = "/refresh",
            consumes = "application/json"
    )
    public HashMap<String, String> refreshToken(@RequestBody RefreshToken refreshToken ){

        logger.info("In Refresh: " + refreshToken.getRefreshToken());
        logger.info("this.refreshToken: " + JWTController.refreshToken);

        SecurityContext context = SecurityContextHolder.getContext();
        Authentication a = context.getAuthentication();
        HashMap<String, String> tokens = new HashMap<>();

        Boolean compareTokens = JWTController.refreshToken.equals(refreshToken.getRefreshToken());
        logger.info("compareTokens: " + compareTokens);

        if(compareTokens){
            tokenCounter++;
            logger.info("tokenCounter: " + tokenCounter);
            String newToken = tokenServices.createToken(a.getName(), tokenCounter );
            String newRefreshToken = "refresher" + Integer.toString(tokenCounter);
            // Store new refresh toekn
            JWTController.refreshToken = newRefreshToken;

            tokens.put("accessToken", newToken);
            tokens.put("refreshToken", newRefreshToken);
            tokens.put("tokenCounter", Integer.toString(tokenCounter));

        }
        else logger.info("Refresh tokens do not match");

        logger.info("tokens: " + tokens);

        return tokens;
    }
}
