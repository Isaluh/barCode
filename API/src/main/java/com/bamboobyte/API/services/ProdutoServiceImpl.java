package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Produto;
import com.bamboobyte.API.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.lang.Override;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProdutoServiceImpl implements ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    public Iterable<Produto> listAllProduto() {
        return produtoRepository.findAll();
    }

    @Override
    public Produto getProdutoById(UUID id) {
        return produtoRepository.findById(id).get();
    }

    @Override
    public Produto saveProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    @Override
    public void deleteProduto(UUID id) {
        produtoRepository.deleteById(id);
    }
}
