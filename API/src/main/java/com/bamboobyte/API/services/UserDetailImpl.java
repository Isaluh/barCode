package com.bamboobyte.API.services;


import com.bamboobyte.API.models.Garcom;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ArrayBlockingQueue;

public class UserDetailImpl implements UserDetails {

    private UUID id;

    private String nome;

    private String cpf;

    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public static UserDetailImpl build(Garcom usuario) {

		return new UserDetailImpl(
				usuario.getId(),
				usuario.getNome(),
                usuario.getCpf(),
                usuario.getPassword()
        );
	}

    public UserDetailImpl(UUID id, String nome, String cpf, String password,
                          Collection<? extends GrantedAuthority> authorities) {
        super();
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.password = password;
        this.authorities = authorities;
    }


    public UserDetailImpl(UUID id, String nome, String cpf, String password) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.password = password;
        this.authorities = new ArrayList<>();
    }

    //    public UserDetailImpl(Garcom garcom) {
//        this.id = garcom.getId();
//        this.nome = garcom.getNome();
//        this.cpf = garcom.getCpf();
//        this.password = garcom.getPassword();
//        this.authorities = new ArrayList<>();
//    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.cpf;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
