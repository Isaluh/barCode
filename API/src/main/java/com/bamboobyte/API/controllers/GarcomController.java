package com.bamboobyte.API.controllers;

import com.bamboobyte.API.models.Garcom;
import com.bamboobyte.API.models.GarcomResponse;
import com.bamboobyte.API.models.Taxa;
import com.bamboobyte.API.services.GarcomServiceImpl;
import com.bamboobyte.API.services.TaxaServiceImpl;
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
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/garcom")
public class GarcomController {
    @Autowired
    private GarcomServiceImpl garcomService;

    @Autowired
    private TaxaServiceImpl taxaService;


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

    @PostMapping("/set/taxa")
    public ResponseEntity<?> mudarTaxa(
        @RequestParam float taxa
    ) {
        if (taxa < 0 || taxa > 1) {
            return ResponseEntity.badRequest().build();
        }
        String gorjetaStr = "gorjeta";
        Optional<Taxa> gorjetaOpt = taxaService.findTaxaByName(gorjetaStr);
        Taxa gorjeta = null;
        if (gorjetaOpt.isEmpty()) {
            gorjeta = new Taxa(gorjetaStr, taxa);
        } else {
            gorjeta = gorjetaOpt.get();
            gorjeta.setTaxa(taxa);
        }
        taxaService.save(gorjeta);
        return ResponseEntity.ok().build();
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
        garcomService.inserirGarcom(garcom);
        UUID createdId = this.garcomService.saveGarcom(garcom).getId();
        URI newGarcomLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path("/garcom/{id}").buildAndExpand(createdId).toUri();
        return ResponseEntity.created(newGarcomLocation).build();
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteGarcom(@RequestParam String cpf) {
        Optional<Garcom> toDelete = garcomService.getGarcomByCpf(cpf);
        if (toDelete.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        garcomService.deleteGarcom(toDelete.get().getId());
        return ResponseEntity.ok().build();
    }

}
