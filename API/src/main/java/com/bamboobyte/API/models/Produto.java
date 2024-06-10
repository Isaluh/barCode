package com.bamboobyte.API.models;


import jakarta.persistence.*;
import org.springframework.data.relational.core.mapping.Table;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.UUID;

@Table(name = "produtos")
@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(unique = true)
    String nome;
    float preco;
    ArrayList<String> categorias;
    String imagemCaminho;

    public Produto() {
    }

    public Produto(String nome, float preco, ArrayList<String> categorias) {
        this.nome = nome;
        this.preco = preco;
        this.categorias = categorias;
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
