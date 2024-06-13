package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Comanda;
import com.bamboobyte.API.models.Garcom;

import java.util.Optional;
import java.util.UUID;

public interface ComandaService {
    Iterable<Comanda> listAllComanda();
    Optional<Comanda> getComandaById(UUID id);
    Comanda saveComanda(Comanda comanda);
    void deleteComanda(UUID id);
}
