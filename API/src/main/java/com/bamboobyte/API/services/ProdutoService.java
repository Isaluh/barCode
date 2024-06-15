package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Produto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProdutoService {
    Iterable<Produto> listAllProduto();
    Optional<Produto> getProdutoById(UUID id);
    Produto saveProduto(Produto produto);
    List<Produto> listAllByCategoria(String nomeCategoria);
    void deleteProduto(UUID id);
}
