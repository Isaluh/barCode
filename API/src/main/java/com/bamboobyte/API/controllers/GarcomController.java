package com.bamboobyte.API.controllers;

import com.bamboobyte.API.models.Garcom;
import com.bamboobyte.API.services.GarcomServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;


@RestController
@RequestMapping({"/garcom"})
public class GarcomController {
    @Autowired
    private GarcomServiceImpl garcomService;

    @GetMapping("/{id}")
    public ResponseEntity<Garcom> showGarcom(@PathVariable String id) {
        UUID uid = UUID.fromString(id);
        return ResponseEntity.ok(this.garcomService.getGarcomById(uid));
    }

    @PostMapping("/new")
    public ResponseEntity<Garcom> createGarcom(@RequestParam("cpf") String cpf, @RequestParam("password") String password) {
        Garcom garcom = new Garcom(cpf, password);
        garcomService.saveGarcom(garcom);
        UUID createdId = this.garcomService.saveGarcom(garcom).getId();
        URI newGarcomLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path("/garcom/{id}").buildAndExpand(createdId).toUri();
        return ResponseEntity.created(newGarcomLocation).build();
    }

}
