package com.bamboobyte.API.models;

public class MesaResponse {
    private int numero;
    private String statusName;
    private int statusCode;

    public MesaResponse() {
    }

    public MesaResponse(Mesa mesa) {
        this.numero = mesa.getNumero();
        this.statusName = mesa.getStatus().toString();
        this.statusCode = mesa.getStatus().valorMesa;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
}