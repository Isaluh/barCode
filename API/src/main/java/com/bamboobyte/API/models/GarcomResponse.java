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
        if (this.cpf.length() == 11) {
            return cpf.substring(0, 3) + "." +
                    cpf.substring(3, 6) + "." +
                    cpf.substring(6, 9) + "-" +
                    cpf.substring(9, 11);
        }
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
