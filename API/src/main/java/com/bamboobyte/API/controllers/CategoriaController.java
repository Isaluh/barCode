package com.bamboobyte.API.controllers;

import com.bamboobyte.API.configuration.FileStorageConfiguration;
import com.bamboobyte.API.models.Categoria;
import com.bamboobyte.API.models.Produto;
import com.bamboobyte.API.models.ProdutoJSON;
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

@CrossOrigin
@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    @Autowired
    private CategoriaServiceImpl categoriaService;

    @GetMapping("/all")
    public ResponseEntity<Set<String>> todasCategorias() {
        Set<String> categoriasNomes =  new HashSet<>();
        for (Categoria categoria:categoriaService.listAllCategoria()) {
            if (!categoria.getNome().startsWith("_")) {
                categoriasNomes.add(categoria.getNome());
            }
        }

        return ResponseEntity.ok(categoriasNomes);
    }
}
