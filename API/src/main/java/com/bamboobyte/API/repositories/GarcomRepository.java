package com.bamboobyte.API.repositories;
import com.bamboobyte.API.models.Garcom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

public interface GarcomRepository extends JpaRepository<Garcom, UUID> {
    Optional<Garcom> findByCpf(String username);
}
