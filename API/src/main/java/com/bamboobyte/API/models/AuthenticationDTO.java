package com.bamboobyte.API.models;

public class AuthenticationDTO {

    private String cpf;
    private String password;

    public AuthenticationDTO() {
    }

    public AuthenticationDTO(String cpf, String password) {
        this.cpf = cpf;
        this.password = password;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
