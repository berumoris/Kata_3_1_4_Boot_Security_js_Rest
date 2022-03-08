package ru.kata.spring.boot_security.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImp;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RestUserController {

    private final UserServiceImp userService;

    @GetMapping(value = "/getAuthorizedUserInfo", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getAllUsers(Authentication authentication) {
        return ResponseEntity.ok().body(userService.getUserByEmail(authentication.getName()));
    }

    @GetMapping(value = "/getAllUsersInfo", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok().body(userService.findAllUsers());
    }

    @PostMapping("/addNewUser")
    public ResponseEntity<User> addNewUser(@RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok().body(HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().body(HttpStatus.OK);
    }
}
