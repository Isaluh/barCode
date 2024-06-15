package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Garcom;
import com.bamboobyte.API.repositories.GarcomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private GarcomRepository garcomRepository;

    @Override
    public UserDetails loadUserByUsername(String cpf) throws UsernameNotFoundException {
        Optional<Garcom> userOpt = garcomRepository.findByCpf(cpf);
        return userOpt.map(UserDetailImpl::new).orElse(null);
    }
}
