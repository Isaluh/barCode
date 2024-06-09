package com.bamboobyte.API.models;
import jakarta.persistence.*;

import java.util.UUID;

@Table(name = "garcons")
@Entity
public class Garcom {
    public Garcom() {}
    public Garcom(String cpf, String password) {
        this.cpf = cpf;
        this.password = password;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(unique = true)
    private String cpf;
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


}
