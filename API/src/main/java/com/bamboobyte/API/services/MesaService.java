package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Mesa;

import java.util.Optional;
import java.util.UUID;

public interface MesaService {
    Iterable<Mesa> listAllMesa();
    Optional<Mesa> getMesaByNumero(int numero);
    Mesa saveMesa(Mesa mesa);
    boolean isNumeroAvaliable(int numero);
    void deleteMesaByNumero(int id);
}
