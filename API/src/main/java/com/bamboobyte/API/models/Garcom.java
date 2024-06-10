package com.bamboobyte.API.models;
import jakarta.persistence.*;

import java.util.UUID;

@Table(name = "garcons")
@Entity
public class Garcom {
    public Garcom() {}
    public Garcom(String cpf, String nome, String password) {
        this.cpf = cpf;
        this.nome = nome;
        this.password = password;
    }
    public Garcom(Long cpf, String nome, String password) {
        this.cpf = cpf.toString();
        this.nome = nome;
        this.password = password;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(unique = true)
    private String cpf;
    private String nome;
    private String password;

    public void blankId() {
        this.id = null;
    }
    public UUID getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
