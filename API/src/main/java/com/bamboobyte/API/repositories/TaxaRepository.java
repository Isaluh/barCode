package com.bamboobyte.API.repositories;
import com.bamboobyte.API.models.Produto;
import com.bamboobyte.API.models.Taxa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaxaRepository extends JpaRepository<Taxa, Integer> {
    Optional<Taxa> getTaxaByNome(String nome);
}
