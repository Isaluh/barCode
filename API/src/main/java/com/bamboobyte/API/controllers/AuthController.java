package com.bamboobyte.API.controllers;


import com.bamboobyte.API.models.AuthenticationDTO;
import com.bamboobyte.API.services.AuthService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        String acessLevel = authService.checkLogin(username, password);
        if (acessLevel.equals("")) {
            return ResponseEntity.status(403).build();
        } else {
            Map<String, String> status = new HashMap<>();
            status.put("acessLevel",acessLevel);
            return ResponseEntity.ok(status);
        }
//        System.out.println(cpf);
//        System.out.println(password);
//        AuthenticationDTO authenticationDTO = new AuthenticationDTO(cpf, password);
//        System.out.println("chegou aqui");
//        return ResponseEntity.ok(authService.login(authenticationDTO));
    }

    @GetMapping("/login")
    public ResponseEntity<?> login() {
        return ResponseEntity.ok("foi");
    }

}
