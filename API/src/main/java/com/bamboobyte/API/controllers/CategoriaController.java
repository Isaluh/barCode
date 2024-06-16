package com.bamboobyte.API.controllers;

import com.bamboobyte.API.configuration.FileStorageConfiguration;
import com.bamboobyte.API.models.Categoria;
import com.bamboobyte.API.models.Produto;
import com.bamboobyte.API.models.ProdutoJSON;
import com.bamboobyte.API.models.ProdutoResponse;
import com.bamboobyte.API.services.CategoriaServiceImpl;
import com.bamboobyte.API.services.ProdutoServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    @Autowired
    private CategoriaServiceImpl categoriaService;
    @Autowired
    private ProdutoServiceImpl produtoService;


    @GetMapping("/all")
    public ResponseEntity<List<String>> todasCategorias() {
        List<String> categoriasNomes =  new ArrayList<>();
        for (Categoria categoria:categoriaService.listAllCategoria()) {
            System.out.println(categoria.getId() + "    "+categoria.getNome());
            if (!categoria.getNome().startsWith("_")) {
                categoriasNomes.add(categoria.getNome());
            }
        }
        for(String nome: categoriasNomes) {
            System.out.println(nome);
        }
        return ResponseEntity.ok(categoriasNomes);
    }

    @GetMapping("/{nomeCategoria}/produtos")
    public ResponseEntity<List<ProdutoResponse>> buscaPorCategoria(@PathVariable() String nomeCategoria) {
        List<ProdutoResponse> produtos = new ArrayList<>();
        for (Produto produto: produtoService.listAllByCategoria(nomeCategoria)) {
            produtos.add(new ProdutoResponse(produto));
        }
        return ResponseEntity.ok(produtos);
    }


}
