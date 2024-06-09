package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Garcom;

import java.util.Optional;
import java.util.UUID;

public interface GarcomService {
    Iterable<Garcom> listAllGarcom();
    Garcom getGarcomById(UUID id);
    Optional<Garcom> getGarcomByCpf(String cpf);
    Garcom saveGarcom(Garcom garcom);
    void deleteGarcom(UUID id);
}
