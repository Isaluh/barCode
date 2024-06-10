package com.bamboobyte.API.controllers;

import com.bamboobyte.API.models.Garcom;
import com.bamboobyte.API.models.GarcomResponse;
import com.bamboobyte.API.services.GarcomServiceImpl;
import com.bamboobyte.API.utils.Validador;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
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

    @GetMapping("/all")
    public ResponseEntity<List<GarcomResponse>> todosGarcom() {
        List<GarcomResponse> garcomList  = new ArrayList<>();
        for (Garcom garcom:garcomService.listAllGarcom()) {
            garcomList.add(new GarcomResponse(garcom));
        }
        return ResponseEntity.ok(garcomList);

    }


    @PostMapping("/new")
    public ResponseEntity<?> createGarcom(@RequestParam("cpf") String cpfString, @RequestParam String nome, @RequestParam("senha") String password) {
        long cpf;
        try {
            System.out.println(cpfString);
            cpf = Long.parseLong(cpfString.replaceAll("[.-]", "").strip());
        } catch (Exception exception) {
            ResponseEntity.badRequest().body("[ ERRO ] CPF deve conter apenas numeros.");
            throw new RuntimeException(exception);
        }


        if (!Validador.isCpfValido(cpf)) {
            return ResponseEntity.badRequest().body("[ ERRO ] CPF inválido.");
        }
        Garcom garcom = new Garcom(cpf, nome, password);
        garcomService.saveGarcom(garcom);
        UUID createdId = this.garcomService.saveGarcom(garcom).getId();
        URI newGarcomLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path("/garcom/{id}").buildAndExpand(createdId).toUri();
        return ResponseEntity.created(newGarcomLocation).build();
    }

}
