package com.bamboobyte.API.repositories;
import com.bamboobyte.API.models.Categoria;
import com.bamboobyte.API.models.Comanda;
import com.bamboobyte.API.models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNome(String nome);
    Iterable<Categoria> findAllByOrderByIdAsc();
}
