package com.bamboobyte.API.controllers;


import com.bamboobyte.API.models.AuthenticationDTO;
import com.bamboobyte.API.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String cpf, @RequestParam String password) {
        System.out.println(cpf);
        System.out.println(password);
        AuthenticationDTO authenticationDTO = new AuthenticationDTO(cpf, password);
        System.out.println("chegou aqui");
        return ResponseEntity.ok(authService.login(authenticationDTO));
    }

    @GetMapping("/login")
    public ResponseEntity<?> login() {
        return ResponseEntity.ok("foi");
    }

}
