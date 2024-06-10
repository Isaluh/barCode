package com.bamboobyte.API.repositories;
import com.bamboobyte.API.models.Garcom;
import com.bamboobyte.API.models.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MesaRepository extends JpaRepository<Mesa, UUID> {
    Optional<Mesa> findByNumero(int numero);
}
