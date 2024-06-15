package com.bamboobyte.API.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/")
public class WelcomeController {
    @GetMapping("/")
    public ResponseEntity<?> welcome() {
        return ResponseEntity.ok("Seja bem vindo à API do barcode");
    }
}
