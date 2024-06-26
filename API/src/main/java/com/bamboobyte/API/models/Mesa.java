package com.bamboobyte.API.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;


@Table(name = "mesa")
@Entity
public class Mesa {
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//    @Column(unique = true)
    @Id
    private int numero;
    private int numeroPessoas = -1;
    private StatusMesa status;
    private UUID idComanda;

    public Mesa() {
    }

    public Mesa(int numero) {
        this.numero = numero;
        this.status = StatusMesa.livre;
    }

    public UUID getIdComanda() {
        return idComanda;
    }

    public void setIdComanda(UUID idComanda) {
        this.idComanda = idComanda;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public int getNumeroPessoas() {
        return numeroPessoas;
    }

    public void setNumeroPessoas(int numeroPessoas) {
        this.numeroPessoas = numeroPessoas;
    }

    public StatusMesa getStatus() {
        return status;
    }

    public void setStatus(StatusMesa status) {
        this.status = status;
    }

    public void limparMesa() {
        this.status = StatusMesa.livre;
        this.numeroPessoas = -1;
        this.idComanda = null;
    }
}
