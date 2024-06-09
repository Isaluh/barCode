package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Produto;

import java.util.Optional;
import java.util.UUID;

public interface ProdutoService {
    Iterable<Produto> listAllProduto();
    Produto getProdutoById(UUID id);
    Produto saveProduto(Produto produto);
    void deleteProduto(UUID id);
}
