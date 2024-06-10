package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Mesa;
import com.bamboobyte.API.repositories.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class MesaServiceImpl implements MesaService {
    @Autowired
    private MesaRepository mesaRepository;

    @Override
    public Iterable<Mesa> listAllMesa() {
        return mesaRepository.findAll();
    }

    @Override
    public Mesa getMesaById(UUID id) {
        return mesaRepository.findById(id).get();
    }
    public Optional<Mesa> getMesaByNumero(int numero){
        return mesaRepository.findByNumero(numero);
    }

    @Override
    public Mesa saveMesa(Mesa Mesa) {
        return mesaRepository.save(Mesa);
    }

    @Override
    public boolean isNumeroAvaliable(int numero) {
        return this.mesaRepository.findByNumero(numero).isEmpty();
    }

    @Override
    public void deleteMesa(UUID id) {
        mesaRepository.deleteById(id);
    }
}
