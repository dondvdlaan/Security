package dev.manyroads;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;


@CrossOrigin
@RestController
public class GreetingController {

	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/greeting")
	public Greeting greeting(
			@RequestParam(value = "name", defaultValue = "World") String name,
			@RequestHeader(value="Authorization") String authorizationHeader
	) {

		System.out.println("Authorization: " + authorizationHeader );
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}

	@GetMapping("/allHeaders")
	public ResponseEntity<Map<Integer,Map>> getAllHeaders (HttpServletRequest request){

		int headerCount = 0;
		Map<Integer, Map> returnValue = new HashMap<>();
		Map<String, Object> allHeaders = new HashMap<>();

		Enumeration<String> headerNames = request.getHeaderNames();

		while(headerNames.hasMoreElements()){

			headerCount++;
			String headerName = headerNames.nextElement();
			allHeaders.put(headerName, request.getHeader(headerName));
		}
		returnValue.put(headerCount,allHeaders);

		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@GetMapping("/auth")
	public String getAuthorization(HttpServletRequest request){

		String authorization = request.getHeader("Authorization");
		String base64Credentials = authorization.substring("Basic".length()).trim();
		byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
		String credentials = new String(credDecoded, StandardCharsets.UTF_8);

		System.out.println("authorization: " + authorization);
		System.out.println("base64Credentials: " + base64Credentials);

		return credentials;
	}

}
