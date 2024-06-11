package com.bamboobyte.API.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Table(name = "comanda")
@Entity
public class Comanda {

    private UUID id;
    @ManyToMany
    private List<Produto> itens = new ArrayList<>();
    @ManyToOne
    private Mesa mesa;

    public Comanda() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public List<Produto> getItens() {
        return itens;
    }

    public void setItens(List<Produto> itens) {
        this.itens = itens;
    }

    public Mesa getMesa() {
        return mesa;
    }

    public void setMesa(Mesa mesa) {
        this.mesa = mesa;
    }

    public Comanda(Mesa mesa) {
        this.mesa = mesa;
    }
}
