package com.bamboobyte.API.models;

import java.util.*;

public class MesaProdutosResponse {
    private int numero;
    private String statusName;
    private int statusCode;
    private List<ItemComanda> produtos = new ArrayList<>();
    private float total;

    public MesaProdutosResponse() {
    }

    public MesaProdutosResponse(Mesa mesa, List<Produto> produtos) {
        this.numero = mesa.getNumero();
        this.statusName = mesa.getStatus().toString();
        this.statusCode = mesa.getStatus().valorMesa;
        Map<UUID, Integer> countProdutos = new HashMap<>();
        Set<Produto> setProdutos = new HashSet<>();
        for (Produto produto:produtos) {
            if (!countProdutos.containsKey(produto.getId())) {
                countProdutos.put(produto.getId(), 1);
                setProdutos.add(produto);
            } else {
                countProdutos.put(produto.getId(), countProdutos.get(produto.getId())+1);
            }
        }
        for (Produto produto: setProdutos) {
            this.produtos.add(new ItemComanda(produto.getNome(), countProdutos.get(produto.getId()), produto.getPreco()));
        }

    }

    public String getTotal() {
        return String.format("%.2f", total);
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public List<ItemComanda> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<ItemComanda> produtos) {
        this.produtos = produtos;
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