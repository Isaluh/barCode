package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Produto;
import com.bamboobyte.API.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.Override;
import java.util.List;
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
    public Optional<Produto> getProdutoById(UUID id) {
        return produtoRepository.findById(id);
    }

    @Override
    public Produto saveProduto(Produto produto) {
        try {
            return produtoRepository.save(produto);
        } catch (Exception exception) {
            System.out.println(produto.getNome()+" nao foi criado, nome repetido");
            return null;
        }
    }

    @Override
    public void deleteProduto(UUID id) {
        produtoRepository.deleteById(id);
    }

    public Optional<Produto> getProdutoByNome(String nome) {
        return this.produtoRepository.getProdutoByNome(nome);
    }
}
