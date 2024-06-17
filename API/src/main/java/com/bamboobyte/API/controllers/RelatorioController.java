package com.bamboobyte.API.controllers;


import com.bamboobyte.API.models.Produto;
import com.bamboobyte.API.models.Venda;
import com.bamboobyte.API.models.VendaDTO;
import com.bamboobyte.API.services.AuthService;
import com.bamboobyte.API.services.ProdutoServiceImpl;
import com.bamboobyte.API.services.VendasServiceImpl;
import com.bamboobyte.API.utils.Validador;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/relatorio")
public class RelatorioController {

    @Autowired
    private VendasServiceImpl vendasService;
    @Autowired
    private AuthService authService;
    @Autowired
    private ProdutoServiceImpl produtoService;



    @PostMapping("/intervalo")
    public String vendasComFiltro(
            @RequestParam String inicio,
            @RequestParam String fim,
            @RequestParam(required = false) Integer numero,
            @RequestParam(required = false) String produto,
            HttpServletResponse response
    ) throws  IOException {
        fim = Validador.adicionarUmDia(fim);
        Long inicioStamp = Validador.dataPraTimestamp(inicio);
        Long fimStamp = Validador.dataPraTimestamp(fim);
        ArrayList<VendaDTO> vendasDTO = new ArrayList<>();
        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment; filename=relatorio.txt");
        StringBuilder resposta = new StringBuilder();
        for (Venda venda: vendasService.findaAllVendas()) {
            if (venda.getData() < fimStamp && venda.getData() > inicioStamp) {
                if (numero == null || venda.getMesa() == numero) {
                    boolean temOProduto = false;
                    ArrayList<String> produtos = new ArrayList<>();
                    for (UUID idProduto:venda.getItens()) {
                        Optional<Produto> produtoOpt = produtoService.getProdutoById(idProduto);
                        if (produtoOpt.isEmpty()) {
                            continue;
                        }
                        if (produtoOpt.get().getNome().equals(produto) || produto == null) {
                            if (produto != null) {
                                produtos.add(produtoOpt.get().getNome());
                            }
                            temOProduto = true;
                            break;
                        }
                    }
                    if (temOProduto) {
                        resposta.append("Venda ").append(venda.getId()).append("\n");
                        resposta.append(String.format("\tMesa: \t%d\n", venda.getMesa()));
                        resposta.append(String.format("\tData: \t%s\n", Validador.converteData(venda.getData())));
                        resposta.append(String.format("\tValor: \t%.2f\n", venda.getValor()));
                        resposta.append(String.format("\tProdutos: \t%s\n", produtos.toString()));
                        resposta.append(String.format("\tForma Pagamento: \t%s\n", venda.getPagamento()));
                        resposta.append(String.format("\tPessoas na mesa: \t%s\n", venda.getPessoasNaMesa()));
                        resposta.append("-----------------------------------------------\n");
                    }
                }
            }
        }
        return resposta.toString();
    }

    @GetMapping("/all")
    public ResponseEntity<?> allVendas(
            @RequestParam String username,
            @RequestParam String password
    ) {
        if (!authService.checkLogin(username, password).equals("ADMIN") ) {
            return ResponseEntity.status(401).build();
        }
        ArrayList<VendaDTO> vendasDTO = new ArrayList<>();
        for (Venda venda:vendasService.findaAllVendas()) {
            vendasDTO.add(new VendaDTO(venda));
        }
        return ResponseEntity.ok(vendasDTO);
    }

    @GetMapping("/diaria")
    public ResponseEntity<?> allVendasDia(
            @RequestParam String username,
            @RequestParam String password
    ) {
        if (!authService.checkLogin(username, password).equals("ADMIN") ) {
            return ResponseEntity.status(401).build();
        }
        ArrayList<VendaDTO> vendasDTO = new ArrayList<>();
        Long atual = new Date().getTime();
        Long duracaoDia = 24L * 60 * 60 * 1000;
        for (Venda venda:vendasService.findaAllVendas()) {
            if (Validador.foramNoMesmoDia(atual, venda.getData())) {
                vendasDTO.add(new VendaDTO(venda));
            }
        }
        return ResponseEntity.ok(vendasDTO);
    }
}
