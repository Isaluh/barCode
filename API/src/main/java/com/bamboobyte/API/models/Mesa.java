package com.bamboobyte.API.models;

import jakarta.persistence.*;

import java.util.UUID;


@Table(name = "mesas")
@Entity
public class Mesa {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(unique = true)
    private int numero;
    private int numeroPessoas = -1;
    private StatusMesa status;
    private long dataAbertura;
    private long dataFechamento;
    private UUID idComanda;

    public long getDataFechamento() {
        return dataFechamento;
    }

    public void setDataFechamento(long dataFechamento) {
        this.dataFechamento = dataFechamento;
    }

    public Mesa() {
    }

    public Mesa(int numero) {
        this.numero = numero;
        this.status = StatusMesa.livre;
        this.dataAbertura = -1;
        this.dataFechamento = -1;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public long getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(long dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public void limparMesa() {
        this.dataAbertura = -1;
        this.dataFechamento = -1;
        this.status = StatusMesa.livre;
        this.numeroPessoas = -1;
    }
}
