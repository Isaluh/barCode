package com.bamboobyte.API.services;


import com.bamboobyte.API.models.AcessDTO;
import com.bamboobyte.API.models.AuthenticationDTO;
import com.bamboobyte.API.models.Garcom;
import com.bamboobyte.API.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired GarcomServiceImpl garcomService;

    @Autowired
    private JwtUtils jwtUtil;

    public AcessDTO login(AuthenticationDTO authDTO) {
        try {
            UsernamePasswordAuthenticationToken userAuth = new UsernamePasswordAuthenticationToken(authDTO.getCpf(), authDTO.getPassword());
            Authentication authentication = authenticationManager.authenticate(userAuth);
            UserDetailImpl userAuthenticated = (UserDetailImpl) authentication.getPrincipal();
            String token = jwtUtil.generateTokenFromUserDetailImpl(userAuthenticated);
            return new AcessDTO(token);
        } catch (BadCredentialsException e) {

        }
        return  new AcessDTO("Acesso Negado");
    }

    public String checkLogin(String username, String password) {
        Optional<Garcom> garcomOpt = garcomService.getGarcomByCpf(username);

        if (garcomOpt.isPresent()) {
            if (garcomOpt.get().getPassword().equals(password)) {
                return "GARCOM";
            }
        }
        if (username.equals("ADMIN") && password.equals("ADMIN")) {
            return "ADMIN";
        }
        return "";
    }


}
