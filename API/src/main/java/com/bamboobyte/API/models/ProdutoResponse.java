package com.bamboobyte.API.models;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ProdutoResponse{
    private String nome;
    private String preco;
    private List<String> categorias;
    private List<String> subCategorias;
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
        this.categorias = new ArrayList<>();
        this.subCategorias = new ArrayList<>();
        for (Categoria categoria:produto.getCategorias()) {
            if (categoria.getNome().startsWith("_")) {
                this.subCategorias.add(categoria.getNome().substring(1));
            } else {
                this.categorias.add(categoria.getNome());
            }
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

    public List<String> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<String> categorias) {
        this.categorias = categorias;
    }

    public List<String> getSubCategorias() {
        return subCategorias;
    }

    public void setSubCategorias(List<String> subCategorias) {
        this.subCategorias = subCategorias;
    }

    public String getImagemCaminho() {
        return imagemCaminho;
    }

    public void setImagemCaminho(String imagemCaminho) {
        this.imagemCaminho = imagemCaminho;
    }
}
