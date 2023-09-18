package dev.manyroads.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class RequestHeaderFilter implements Filter {

    Logger logger = Logger.getLogger(RequestHeaderFilter.class.getName());

    @Override
    public void doFilter(
            ServletRequest servletRequest,
            ServletResponse servletResponse,
            FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse res = (HttpServletResponse) servletResponse;

        String reqID = req.getHeader("RequestID");

        try{
            if((reqID == null) || reqID.isBlank()){
                res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                throw new ServletException("No request ID");
            }
        }catch(ServletException ex){
            logger.log(Level.SEVERE, ex.getMessage());
            return;
        }
        filterChain.doFilter(req, res);
    }
}
