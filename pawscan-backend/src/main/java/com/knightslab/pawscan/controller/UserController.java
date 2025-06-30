package com.knightslab.pawscan.controller;

import org.springframework.security.core.Authentication;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class UserController {

    @GetMapping("/user")
    public ResponseEntity<?>getUserInfo(@NotNull Authentication authentication) {
        String uid = (String) authentication.getPrincipal();
        return  ResponseEntity.ok("Hello user with UID: " + uid);
    }


}
