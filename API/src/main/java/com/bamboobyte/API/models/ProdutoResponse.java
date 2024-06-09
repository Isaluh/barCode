package com.bamboobyte.API.models;

import java.util.Arrays;
import java.util.List;

public class ProdutoResponse{
    private String nome;
    private String preco;
    private String[] categorias;
    private String imagemCaminho;
    public ProdutoResponse() {
    }

    public ProdutoResponse(Produto produto) {
        this.nome = produto.getNome();
        this.preco = String.format("%.2f", produto.getPreco());
        this.imagemCaminho = produto.getImagemCaminho();
        if (this.imagemCaminho == null) {
            this.imagemCaminho = "";
        }
        this.categorias = new String[produto.getCategorias().size()];
        int counter = 0;
        for (String categoria:produto.getCategorias()) {
            this.categorias[counter++] = categoria;
        }
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPreco() {
        return preco;
    }

    public void setPreco(String preco) {
        this.preco = preco;
    }

    public String[] getCategorias() {
        return categorias;
    }

    public void setCategorias(String[] categorias) {
        this.categorias = categorias;
    }

    public String getImagemCaminho() {
        return imagemCaminho;
    }

    public void setImagemCaminho(String imagemCaminho) {
        this.imagemCaminho = imagemCaminho;
    }
}
