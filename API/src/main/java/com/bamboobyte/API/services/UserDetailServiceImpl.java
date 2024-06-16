package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Garcom;
import com.bamboobyte.API.repositories.GarcomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private GarcomRepository garcomRepository;

    @Override
    public UserDetails loadUserByUsername(String cpf) throws UsernameNotFoundException {
        Garcom garcom = garcomRepository.findByCpf(cpf).get();
        return UserDetailImpl.build(garcom);
    }
}
