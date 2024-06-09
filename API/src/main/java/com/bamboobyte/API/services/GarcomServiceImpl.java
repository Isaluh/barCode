package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Garcom;
import com.bamboobyte.API.repositories.GarcomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.lang.Override;
import java.util.Optional;
import java.util.UUID;

@Service
public class GarcomServiceImpl implements GarcomService {
    @Autowired
    private GarcomRepository garcomRepository;

    @Override
    public Iterable<Garcom> listAllGarcom() {
        return garcomRepository.findAll();
    }

    @Override
    public Garcom getGarcomById(UUID id) {
        return garcomRepository.findById(id).get();
    }
    public Optional<Garcom> getGarcomByCpf(String cpf){
        return garcomRepository.findByCpf(cpf);
    }

    @Override
    public Garcom saveGarcom(Garcom garcom) {
        return garcomRepository.save(garcom);
    }

    @Override
    public void deleteGarcom(UUID id) {
        garcomRepository.deleteById(id);
    }
}
