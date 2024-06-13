package com.bamboobyte.API.controllers;


import com.bamboobyte.API.models.*;
import com.bamboobyte.API.services.MesaServiceImpl;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/comanda")
public class ComandaController {
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarComanda(@PathVariable("uuid") String uuidString) {
        UUID uuid = UUID.fromString(uuidString);
        return ResponseEntity.ok("NAO IMPLEMENTADO AINDA");
    }
}