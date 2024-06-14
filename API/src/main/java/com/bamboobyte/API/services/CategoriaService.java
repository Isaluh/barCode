package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Categoria;
import com.bamboobyte.API.models.Produto;

import java.util.Optional;
import java.util.UUID;

public interface CategoriaService {
    Iterable<Categoria> listAllCategoria();
    Optional<Categoria> getCategoriaByNome(String nome);
    Categoria saveCategoria(Categoria categoria);
    void deleteCategoria(Long id);
}
