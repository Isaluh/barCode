package com.bamboobyte.API.models;

import java.util.List;

//essa classe é usada para conseguirmos ler os Produtos que serão carregados via JSON
//eles geralmente vem com menos atributos, por isso está classe é basicamente
//uma copia do Produto porém com menos coisas
public class ProdutoJSON {
    private String nome;
    private Float preco;
    private String[] categorias;

    public ProdutoJSON() {
    }

    public ProdutoJSON(String nome, float preco, String[] categorias) {
        this.nome = nome;
        this.preco = preco;
        this.categorias = categorias;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public float getPreco() {
        return preco;
    }

    public void setPreco(float preco) {
        this.preco = preco;
    }

    public String[] getCategorias() {
        return categorias;
    }

    public void setCategorias(String[] categorias) {
        this.categorias = categorias;
    }
}
