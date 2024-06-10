package com.bamboobyte.API.models;

public enum StatusMesa {
    livre(0),
    ocupada(1),
    aPagar(2);



    public int valorMesa;
    StatusMesa(int valor) {
        valorMesa = valor;
    }
}
