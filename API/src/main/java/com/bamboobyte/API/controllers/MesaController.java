package com.bamboobyte.API.controllers;


import com.bamboobyte.API.models.*;
import com.bamboobyte.API.services.*;
import com.bamboobyte.API.utils.Validador;
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
    @Autowired
    private AuthService authService;
    @Autowired
    private TaxaServiceImpl taxaService;
    @Autowired
    private VendasServiceImpl vendasService;


    @GetMapping("/all")
    public ResponseEntity<List<MesaResponse>> listarMesas(
            @RequestParam String username,
            @RequestParam String password
    ) {
        if (!authService.checkLogin(username, password).equals("GARCOM") && !authService.checkLogin(username, password).equals("ADMIN") ) {
            return ResponseEntity.status(401).build();
        }
        ArrayList<MesaResponse> mesas = new ArrayList<>();
        for (Mesa mesa:this.mesaService.listAllMesa()) {
            mesas.add(new MesaResponse(mesa));
        }
        return ResponseEntity.ok(mesas);
    }

    @PostMapping("/new")
    public ResponseEntity<?> createMesa(
            @RequestParam Integer numero,
            @RequestParam String username,
            @RequestParam String password
    ) {
        System.out.println();
        if (!authService.checkLogin(username, password).equals("GARCOM") && !authService.checkLogin(username, password).equals("ADMIN") ) {
            return ResponseEntity.status(401).build();
        }
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
    public ResponseEntity<?> buscarMesa(
            @PathVariable int id,
            @RequestParam String username,
            @RequestParam String password
    ) {
        if (!authService.checkLogin(username, password).equals("GARCOM") && !authService.checkLogin(username, password).equals("ADMIN") ) {
            return ResponseEntity.status(401).build();
        }
        Optional<Mesa> mesaOpt = mesaService.getMesaByNumero(id);
        if (mesaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Mesa mesa = mesaOpt.get();
        if (mesa.getIdComanda() != null) {
            Optional<Comanda> comandaOpt = comandaService.getComandaById(mesa.getIdComanda());
            if (comandaOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            Comanda comanda = comandaOpt.get();
            ArrayList<Produto> produtos = new ArrayList<>();
            for (UUID produtoId:comanda.getItens()) {
                produtos.add(produtoService.getProdutoById(produtoId).get());
            }
            MesaProdutosResponse mesaResponse = new MesaProdutosResponse(mesa, produtos);
            float totalBase = 0;
            for (ItemComanda item: mesaResponse.getProdutos()) {
                totalBase += Float.parseFloat(item.getPrecoUnitario()) * item.getQuantidade();
            }
            float total = totalBase;
            if (mesa.getStatus() == StatusMesa.aPagar) {
                total += totalBase * taxaService.findTaxaByName("gorjeta").get().getTaxa();
                if (Validador.isDepoisDasUmaAteQuatro(comanda.getDataFechamento())) {
                    total -= totalBase * 0.1f;
                }
            }
            mesaResponse.setTotal(total);
            return ResponseEntity.ok(mesaResponse);

        } else {
            MesaProdutosResponse mesaResponse = new MesaProdutosResponse(mesa, new ArrayList<>());
            return ResponseEntity.ok(mesaResponse);
        }

    }
    @PostMapping("/set/quantidade")
    public ResponseEntity<Void> adicionarQuantidade(
            @RequestParam int numero,
            @RequestParam int quantidade,
            @RequestParam String username,
            @RequestParam String password
    ) {
        if (!authService.checkLogin(username, password).equals("GARCOM") && !authService.checkLogin(username, password).equals("ADMIN") ) {
            return ResponseEntity.status(401).build();
        }
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
            @RequestParam int numero,
            @RequestParam String username,
            @RequestParam String password
    ) {
        if (!authService.checkLogin(username, password).equals("GARCOM") && !authService.checkLogin(username, password).equals("ADMIN") ) {
            return ResponseEntity.status(401).build();
        }
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
            comandaService.saveComanda(comanda);
        }
        mesaService.saveMesa(mesa);
        // TODO fechar comanda
//        mesa.setDataFechamento(new Date().getTime());
        // TODO Verificar como vai ser feita as regras de desconto, acrescimo, etc
        // é aqui que devera ser adicionado a porcentagem do garçom e o desconto por horário
        return ResponseEntity.ok().build();
    }

    @PostMapping("/pagar")
    public ResponseEntity<?> pagamentoRealizado(
            @RequestParam int numero,
            @RequestParam String formaPagamento,
            @RequestParam String username,
            @RequestParam String password
    ) {
        if (!authService.checkLogin(username, password).equals("GARCOM") && !authService.checkLogin(username, password).equals("ADMIN") ) {
            return ResponseEntity.status(401).build();
        }

//        ArrayList<String> metodosAceitos = new ArrayList<>();
//        metodosAceitos.add("Pix");

//        // TODO adicionar outros metodos
//        if (!metodosAceitos.contains(formaPagamento)) {
//            return ResponseEntity.badRequest().body("Metodo de pagamento não suportado");
//        }
        Optional<Mesa> mesaOptional = mesaService.getMesaByNumero(numero);
        if (mesaOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // TODO salvar venda em uma tabela vendas
        Mesa mesa = mesaOptional.get();
        if (mesa.getStatus() != StatusMesa.aPagar) {
            return ResponseEntity.status(403).body("Status da mesa não permite pagamento");
        }
        Venda venda = new Venda();
        venda.setMesa(mesa.getNumero());
        venda.setPagamento(formaPagamento);
        Comanda comanda = comandaService.getComandaById(mesa.getIdComanda()).get();
        venda.setData(comanda.getDataAbertura());
        venda.setItens(comanda.getItens());
        float valor = 0;
        float valorBase = 0;
        for (UUID idProduto : comanda.getItens()) {
            valorBase += produtoService.getProdutoById(idProduto).get().getPreco();
        }
        valor += valorBase;
        valor += valorBase * taxaService.findTaxaByName("gorjeta").get().getTaxa();
        if (Validador.isDepoisDasUmaAteQuatro(comanda.getDataFechamento())) {
            valor -= valorBase * 0.1f;
        }
        venda.setValor(valor);
        venda.setPessoasNaMesa(mesa.getNumeroPessoas());
        vendasService.novaVenda(venda);
        mesa.limparMesa();
        mesaService.saveMesa(mesa);



        return ResponseEntity.ok().build();
    }

    @PostMapping("/add/produto")
    public ResponseEntity<?> adicionarProduto(
            @RequestParam(name="numero") int numeroMesa,
            @RequestParam(name="produto") String nomeProduto,
            @RequestParam String username,
            @RequestParam String password
    ) {
        if (!authService.checkLogin(username, password).equals("GARCOM") && !authService.checkLogin(username, password).equals("ADMIN") ) {
            return ResponseEntity.status(401).build();
        }
        Optional<Produto> produtoOpt = produtoService.getProdutoByNome(nomeProduto);
        if (produtoOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Nenhum produto encontrado com esse nome");
        }
        Produto produto = produtoOpt.get();
        Optional<Mesa> mesaOpt = mesaService.getMesaByNumero(numeroMesa);
        if (mesaOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Nenhuma mesa encontrada com esse número");
        }
        Mesa mesa = mesaOpt.get();
        if (mesa.getStatus() != StatusMesa.ocupada) {
            return ResponseEntity.status(403).build();
        }
        if (mesa.getIdComanda() == null) {
            return ResponseEntity.status(404).body("Nenhuma Comanda está aberta para essa mesa ");
        }
        Optional<Comanda> comandaOpt = comandaService.getComandaById(mesa.getIdComanda());
        if (comandaOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Comanda cadastrada na mesa, porém não encontrada.");
        }
        Comanda comanda = comandaOpt.get();
        comanda.adicionarItem(produto.getId());
        comandaService.saveComanda(comanda);
        return ResponseEntity.ok("Produto "+produto.getNome()+" adicionado à comanda.");
    }



}
