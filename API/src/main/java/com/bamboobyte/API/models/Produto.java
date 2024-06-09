package com.bamboobyte.API.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.ArrayList;
import java.util.UUID;

@Table(name = "produtos")
@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    String nome;
    float preco;
    ArrayList<String> categorias;
    String imagemCaminho;

    public Produto() {
    }

    public Produto(String nome, float preco, ArrayList<String> categorias, String imagemCaminho) {
        this.nome = nome;
        this.preco = preco;
        this.categorias = categorias;
        this.imagemCaminho = imagemCaminho;
    }

    public UUID getId() {
        return id;
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

    public ArrayList<String> getCategorias() {
        return categorias;
    }

    public void setCategorias(ArrayList<String> categorias) {
        this.categorias = categorias;
    }

    public String getImagemCaminho() {
        return imagemCaminho;
    }

    public void setImagemCaminho(String imagemCaminho) {
        this.imagemCaminho = imagemCaminho;
    }
}
