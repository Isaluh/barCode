package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Comanda;
import com.bamboobyte.API.models.Garcom;
import com.bamboobyte.API.repositories.ComandaRepository;
import com.bamboobyte.API.repositories.GarcomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ComandaServiceImpl implements ComandaService {
    @Autowired
    private ComandaRepository comandaRepository;

    @Override
    public Iterable<Comanda> listAllComanda() {
        return comandaRepository.findAll();
    }

    @Override
    public Optional<Comanda> getComandaById(UUID id) {
        return comandaRepository.findById(id);
    }

    @Override
    public Comanda saveComanda(Comanda comanda) {
        return comandaRepository.save(comanda);
    }

    @Override
    public void deleteComanda(UUID id) {
        comandaRepository.deleteById(id);
    }
}
