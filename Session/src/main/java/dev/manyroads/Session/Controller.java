package dev.manyroads.Session;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
//@CrossOrigin
public class Controller {

    Logger logger = Logger.getLogger(RestController.class.getName());

    @GetMapping("/")
    public String test1(HttpServletRequest req, HttpServletResponse res){

        logger.info("In test1.");

        /*
        Create Session
         */
        HttpSession session = req.getSession(true);
        session.setAttribute("Naampje","PussyCat");
        // Set time-out inactivity programmable or in the application file
        //session.setMaxInactiveInterval(30);

        /*
        Set Cookie
         */
        Cookie cookie1 = new Cookie("NogEeenNaampje", "geenNaam");
        cookie1.setHttpOnly(false);
        cookie1.setMaxAge(120);
        res.addCookie(cookie1);


       /*
       URL Rewriting
        */
        String sURI = "<nothingToSeeHere>";
        sURI = req.getRequestURI();
        logger.log(Level.INFO,"test1 URI: " + sURI );
        logger.log(Level.INFO,"test1 URL: " + req.getRequestURL() );

        return  "Holita";
    }

    @GetMapping("/test2")
    public ResponseEntity test2 (HttpServletRequest req, HttpServletResponse res)
            throws IOException, ServletException {

        logger.info("In test2.");

        /*
        Continue Session stated in method test1
         */
        String s = "<nothingToSeeHere>";
        String sID = "<nothingToSeeHere>";
        LocalDate creationLocalDate = LocalDate.now().minusDays(1);
        Date creationDate = new Date(0);
        Date lastAccessDate = new Date(0);
        long timeInSeconds = 0;

        HttpSession session = req.getSession(false);

        try{
            s = (String) session.getAttribute("Naampje");
            sID = session.getId();
            creationDate = new Date(session.getCreationTime());
            lastAccessDate = new Date(session.getLastAccessedTime());

        }catch (Exception ex){
            logger.log(Level.SEVERE, "Foutje uitlezen Session: " + ex.getMessage());
        }
        logger.info("Naampje: " + s);
        logger.info("SessionID: " + sID);
        logger.info("Session creation Date: " + creationDate);
        logger.info("Last Accessed Time: " + lastAccessDate);

        /*
        Cookies
         */
        Cookie[] cookies = req.getCookies();

        Iterator<Cookie> it = Arrays.stream(cookies).iterator();
        while(it.hasNext()){
            logger.info("Cookie: " + it.next().getName());
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Hello " + s);
    }
}
