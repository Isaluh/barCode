package com.bamboobyte.API.controllers;


import com.bamboobyte.API.models.*;
import com.bamboobyte.API.services.ComandaServiceImpl;
import com.bamboobyte.API.services.MesaServiceImpl;
import com.bamboobyte.API.services.ProdutoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/mesa")
public class MesaController {

    @Autowired
    private MesaServiceImpl mesaService;
    @Autowired
    private ComandaServiceImpl comandaService;
    @Autowired
    private ProdutoServiceImpl produtoService;

    @GetMapping("/all")
    public ResponseEntity<List<MesaResponse>> listarMesas() {
        ArrayList<MesaResponse> mesas = new ArrayList<>();
        for (Mesa mesa:this.mesaService.listAllMesa()) {
            mesas.add(new MesaResponse(mesa));
        }
        return ResponseEntity.ok(mesas);
    }

    @PostMapping("/new")
    public ResponseEntity<?> createMesa(@RequestParam Integer numero) {
        if (!mesaService.isNumeroAvaliable(numero)) {
            return ResponseEntity.status(409).body("[ ERRO ] Já existe uma mesa com esse numero: "+numero);
        }
        if (numero < 1) {
            return ResponseEntity.badRequest().body("[ ERRO ] Tentando abrir mesa com número de pessoas < 1");
        }
        Mesa mesa = new Mesa(numero);
        mesaService.saveMesa(mesa);
        this.mesaService.saveMesa(mesa);
        URI newMesaLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path("/mesa/{id}").buildAndExpand(mesa.getNumero()).toUri();
        return ResponseEntity.created(newMesaLocation).build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarMesa( @PathVariable int id) {
        Optional<Mesa> mesaOpt = mesaService.getMesaByNumero(id);
        if (mesaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Mesa mesa = mesaOpt.get();
        Optional<Comanda> comandaOpt = comandaService.getComandaById(mesa.getIdComanda());
        if (comandaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Comanda comanda = comandaOpt.get();
        ArrayList<Produto> produtos = new ArrayList<>();
        for (UUID produtoId:comanda.getItens()) {
            produtos.add(produtoService.getProdutoById(produtoId).get());
        }
        return ResponseEntity.ok(new MesaProdutosResponse(mesa, produtos));
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
        Comanda comanda = new Comanda(mesa.getNumero());
        comanda.setDataAbertura(new Date().getTime());
        comanda = comandaService.saveComanda(comanda);

        mesa.setIdComanda(comanda.getId());
        mesa.setStatus(StatusMesa.ocupada);
        mesaService.saveMesa(mesa);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/fechar")
    public ResponseEntity<?> statusAPagar(
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
        Optional<Comanda> comandaOpt = comandaService.getComandaById(mesa.getIdComanda());
        Comanda comanda = null;
        if (comandaOpt.isPresent()) {
            comanda = comandaOpt.get();
            comanda.setDataFechamento(new Date().getTime());
        }
        comandaService.saveComanda(comanda);
        mesaService.saveMesa(mesa);
        // TODO fechar comanda
//        mesa.setDataFechamento(new Date().getTime());
        // TODO Verificar como vai ser feita as regras de desconto, acrescimo, etc
        // é aqui que devera ser adicionado a porcentagem do garçom e o desconto por horário
        return ResponseEntity.ok("mesa fechada");
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
        return ResponseEntity.ok("Mesa "+mesa.getNumero()+" foi paga");
    }

    @PostMapping("/add/produto")
    public ResponseEntity<?> adicionarProduto(
            @RequestParam(required = false, name="id") String uuidString,
            @RequestParam(required = false, name="nome") String nome
    ) {
        if (uuidString == null && nome == null) {
            return ResponseEntity.badRequest().build();
        }
        Optional<Produto> produtoOpt;
        if (uuidString != null) {
            UUID uuid = UUID.fromString(uuidString);
        } else if (nome != null) {
            //TODO terminar isso
        }
    }



}
