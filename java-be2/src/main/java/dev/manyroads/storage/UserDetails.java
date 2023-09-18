package dev.manyroads.storage;

import dev.manyroads.model.User;

import java.util.ArrayList;
import java.util.List;

public class UserDetails {

    public static List<User> users = new ArrayList<>();

    public void save(User user){
        users.add(user);
    }
}
