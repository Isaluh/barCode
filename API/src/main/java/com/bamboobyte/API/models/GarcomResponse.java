package com.bamboobyte.API.models;

public class GarcomResponse {
    String cpf;
    String nome;

    public GarcomResponse() {
    }

    public GarcomResponse(Garcom garcom) {
        this.cpf = garcom.getCpf();
        this.nome = garcom.getNome();
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
