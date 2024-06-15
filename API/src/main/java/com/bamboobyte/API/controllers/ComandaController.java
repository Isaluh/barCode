//package com.bamboobyte.API.controllers;
//
//
//import com.bamboobyte.API.models.*;
//import com.bamboobyte.API.services.ComandaServiceImpl;
//import com.bamboobyte.API.services.MesaServiceImpl;
//import org.apache.coyote.Response;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.server.ResponseStatusException;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//
//import java.net.URI;
//import java.util.*;
//
//@RestController
//@RequestMapping("/comanda")
//public class ComandaController {
//    @Autowired
//    private ComandaServiceImpl comandaService;
//    @Autowired
//    private MesaServiceImpl mesaService;
//
//    @GetMapping("/{numero}")
//    public ResponseEntity<?> buscarComanda(@PathVariable("numero") Integer numeroMesa) {
//        Optional<Mesa> mesaDaComandaOpt = mesaService.getMesaByNumero(numeroMesa);
//        if (mesaDaComandaOpt.isEmpty()) {
//            return ResponseEntity.status(404).body("Mesa não encontrada.");
//        }
//        UUID idComanda = mesaDaComandaOpt.get().getIdComanda();
//        Optional<Comanda> comandaOpt = comandaService.getComandaById(idComanda);
//        if (comandaOpt.isEmpty()) {
//            return ResponseEntity.status(404).body("Comanda não encontrada.");
//        }        return ResponseEntity.ok("NAO IMPLEMENTADO AINDA");
//    }
//}