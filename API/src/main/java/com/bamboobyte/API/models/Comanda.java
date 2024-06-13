package com.bamboobyte.API.models;

import com.bamboobyte.API.services.ProdutoServiceImpl;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@Table(name = "comanda")
@Entity
public class Comanda {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private List<UUID> itens = new ArrayList<>();
    private int num_mesa;
    private int quantidadePessoas;
    private long dataAbertura;
    private long dataFechamento;

    public Comanda() {
    }
    public Comanda(int num_mesa) {
        this.num_mesa = num_mesa;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void adicionarItem(UUID id) {
        this.itens.add(id);
    }

    public long getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(long dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public long getDataFechamento() {
        return dataFechamento;
    }

    public void setDataFechamento(long dataFechamento) {
        this.dataFechamento = dataFechamento;
    }

    public List<UUID> getItens() {
        return itens;
    }

    public void setItens(List<UUID> itens) {
        this.itens = itens;
    }

    public int getNum_mesa() {
        return num_mesa;
    }

    public void setNum_mesa(int num_mesa) {
        this.num_mesa = num_mesa;
    }

    public int getQuantidadePessoas() {
        return quantidadePessoas;
    }

    public void setQuantidadePessoas(int quantidadePessoas) {
        this.quantidadePessoas = quantidadePessoas;
    }
}
