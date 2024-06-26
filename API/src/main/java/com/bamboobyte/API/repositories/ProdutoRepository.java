package com.bamboobyte.API.repositories;
import com.bamboobyte.API.models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProdutoRepository extends JpaRepository<Produto, UUID> {
    Optional<Produto> getProdutoByNome(String nome);
    List<Produto> findByCategoriasNome(String nomeCategoria);
}
