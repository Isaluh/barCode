package com.bamboobyte.API.models;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long data;
    private Integer mesa;
    private float valor;
    private String pagamento;
    private List<UUID> itens = new ArrayList<>();
    private Integer pessoasNaMesa = 0;

    public Integer getPessoasNaMesa() {
        return pessoasNaMesa;
    }

    public void setPessoasNaMesa(Integer pessoasNaMesa) {
        this.pessoasNaMesa = pessoasNaMesa;
    }

    public Venda() {
    }

    public Venda(Long id, Long data, int mesa, float valor, String pagamento) {
        this.id = id;
        this.data = data;
        this.mesa = mesa;
        this.valor = valor;
        this.pagamento = pagamento;
    }

    public void adicionarItem(UUID uuid) {
        this.itens.add(uuid);
    }
    public void AdicionarItens(Collection<UUID> uuids) {
        this.itens.addAll(uuids);
    }

    public void setMesa(Integer mesa) {
        this.mesa = mesa;
    }

    public List<UUID> getItens() {
        return itens;
    }

    public void setItens(List<UUID> itens) {
        this.itens = itens;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getData() {
        return data;
    }

    public void setData(Long data) {
        this.data = data;
    }

    public int getMesa() {
        return mesa;
    }

    public void setMesa(int mesa) {
        this.mesa = mesa;
    }

    public float getValor() {
        return valor;
    }

    public void setValor(float valor) {
        this.valor = valor;
    }

    public String getPagamento() {
        return pagamento;
    }

    public void setPagamento(String pagamento) {
        this.pagamento = pagamento;
    }
}
