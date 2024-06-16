package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Garcom;
import com.bamboobyte.API.repositories.GarcomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.lang.Override;
import java.util.Optional;
import java.util.UUID;

@Service
public class GarcomServiceImpl implements GarcomService {
    @Autowired
    private GarcomRepository garcomRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

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
    public Garcom inserirGarcom(Garcom garcom) {
        garcom.setId(null);
        garcom.setPassword(passwordEncoder.encode(garcom.getPassword()));
        return this.saveGarcom(garcom);
    }

    @Override
    public Garcom saveGarcom(Garcom garcom) {
//        garcom.setPassword(passwordEncoder.encode(garcom.getPassword()));
        return garcomRepository.save(garcom);
    }

    @Override
    public void deleteGarcom(UUID id) {
        garcomRepository.deleteById(id);
    }
}
