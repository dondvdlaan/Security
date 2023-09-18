package dev.manyroads.model;

public class User {

    public static final String DEFAULT_STRING = "<nothingToSeeHere>";
    private String username;
    private String password;
    private String token;

    public User() {
        this.username = DEFAULT_STRING;
        this.password = DEFAULT_STRING;
        this.token = DEFAULT_STRING;
    }

    public User(String username, String password, String token) {
        this.username = username;
        this.password = password;
        this.token = token;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getToken() {
        return token;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}
