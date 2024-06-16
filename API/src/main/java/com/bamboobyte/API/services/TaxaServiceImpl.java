package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Garcom;
import com.bamboobyte.API.models.Taxa;
import com.bamboobyte.API.repositories.GarcomRepository;
import com.bamboobyte.API.repositories.TaxaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TaxaServiceImpl  {

    @Autowired
    private TaxaRepository taxaRepository;

    public Taxa save(Taxa taxa) {
        return this.taxaRepository.save(taxa);
    }

    public Taxa novaTaxa(Taxa taxa) {
        taxa.setId(null);
        return this.taxaRepository.save(taxa);
    }

    public Optional<Taxa> findTaxaByName(String nomeTaxa) {
        return this.taxaRepository.getTaxaByNome(nomeTaxa);
    }




}
