package com.bamboobyte.API.models;

public class ItemComanda {

    private String produto;
    private int quantidade;
    private float precoUnitario;

    public ItemComanda(String produto, int quantidade, float precoUnitario) {
        this.produto = produto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }

    public String getProduto() {
        return produto;
    }

    public void setProduto(String produto) {
        this.produto = produto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getPrecoUnitario() {
        return String.format("%.2f", this.precoUnitario);
    }

    public void setPrecoUnitario(float precoUnitario) {
        this.precoUnitario = precoUnitario;
    }
}
