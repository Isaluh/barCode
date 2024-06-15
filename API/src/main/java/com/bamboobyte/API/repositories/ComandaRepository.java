package com.bamboobyte.API.repositories;
import com.bamboobyte.API.models.Comanda;
import com.bamboobyte.API.models.Garcom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ComandaRepository extends JpaRepository<Comanda, UUID> {
    Optional<Comanda> findById(UUID uuid);
}
