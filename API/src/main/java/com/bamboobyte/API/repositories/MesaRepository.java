package com.bamboobyte.API.repositories;

import com.bamboobyte.API.models.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

public interface MesaRepository extends JpaRepository<Mesa, Integer> {
    Optional<Mesa> findByNumero(int numero);
    void deleteMesaByNumero(int numero);
}
