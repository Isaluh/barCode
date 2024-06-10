package com.bamboobyte.API.controllers;


import com.bamboobyte.API.models.*;
import com.bamboobyte.API.services.MesaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping({"/mesa"})
public class MesaController {

    @Autowired
    private MesaServiceImpl mesaService;

    @GetMapping("/all")
    public ResponseEntity<List<MesaResponse>> listarMesas() {
        ArrayList<MesaResponse> mesas = new ArrayList<>();
        for (Mesa mesa:this.mesaService.listAllMesa()) {
            mesas.add(new MesaResponse(mesa));
        }
        return ResponseEntity.ok(mesas);
    }

    @PostMapping("/new")
    public ResponseEntity<?> createMesa(@RequestParam int numero) {
        if (!mesaService.isNumeroAvaliable(numero)) {
            return ResponseEntity.status(409).body("[ ERRO ] Já existe uma mesa com esse numero: "+numero);
        }
        if (numero < 1) {
            return ResponseEntity.badRequest().body("[ ERRO ] Tentando abrir mesa com número de pessoas < 1");
        }
        Mesa mesa = new Mesa(numero);
        mesaService.saveMesa(mesa);
        UUID createdId = this.mesaService.saveMesa(mesa).getId();
        URI newMesaLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path("/mesa/{id}").buildAndExpand(createdId).toUri();
        return ResponseEntity.created(newMesaLocation).build();
    }

    @PostMapping("/set/quantidade")
    public ResponseEntity<Void> adicionarQuantidade(
            @RequestParam int numero,
            @RequestParam int quantidade
    ) {
        if (quantidade < 1) {
            return ResponseEntity.badRequest().build();
        }
        Optional<Mesa> mesaOptional = mesaService.getMesaByNumero(numero);
        System.out.println(mesaOptional.isPresent());
        if (mesaOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Mesa mesa = mesaOptional.get();
        if (mesa.getNumeroPessoas() != -1) {
            return ResponseEntity.badRequest().build();
        }
        mesa.setNumeroPessoas(quantidade);
        mesa.setDataAbertura(new Date().getTime());
        System.out.println(mesa.getDataAbertura());
        mesa.setStatus(StatusMesa.ocupada);
        mesaService.saveMesa(mesa);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/fechar")
    public ResponseEntity<Void> statusAPagar(
            @RequestParam int numero
    ) {
        Optional<Mesa> mesaOptional = mesaService.getMesaByNumero(numero);
        if (mesaOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Mesa mesa = mesaOptional.get();
        if (mesa.getStatus() != StatusMesa.ocupada) {
            return ResponseEntity.badRequest().build();
        }
        mesa.setStatus(StatusMesa.aPagar);
        mesa.setDataFechamento(new Date().getTime());
        // TODO Verificar como vai ser feita as regras de desconto, acrescimo, etc
        // é aqui que devera ser adicionado a porcentagem do garçom e o desconto por horário
        mesaService.saveMesa(mesa);
        URI mesaLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path("/produtos/{id}").buildAndExpand(mesa.getId()).toUri();
        return ResponseEntity.created(mesaLocation).build();
    }

    @PostMapping("/pagar")
    public ResponseEntity<?> pagamentoRealizado(
            @RequestParam int numero,
            @RequestParam String formaPagamento
    ) {
        ArrayList<String> metodosAceitos = new ArrayList<>();
        metodosAceitos.add("Pix");
        // TODO adicionar outros metodos
        if (!metodosAceitos.contains(formaPagamento)) {
            return ResponseEntity.badRequest().body("Metodo de pagamento não suportado");
        }
        Optional<Mesa> mesaOptional = mesaService.getMesaByNumero(numero);
        if (mesaOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // TODO salvar venda em uma tabela vendas
        Mesa mesa = mesaOptional.get();
        mesa.limparMesa();
        mesaService.saveMesa(mesa);
        return ResponseEntity.ok().build();
    }



}
