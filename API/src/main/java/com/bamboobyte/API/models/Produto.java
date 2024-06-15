package com.bamboobyte.API.models;


import jakarta.persistence.*;

import java.nio.file.Path;
import java.util.*;

@Table(name = "produto")
@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true)
    private String nome;
    private float preco;
    @ManyToMany
    @JoinTable(
            name = "produto_categoria",
            joinColumns = @JoinColumn(name = "produto_id"),
            inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private Set<Categoria> categorias = new HashSet<>();
    private String imagemCaminho;
    public Produto() {
    }

    public Produto(String nome, float preco) {
        this.nome = nome;
        this.preco = preco;
    }
    public Produto(String nome, float preco, Collection<Categoria> categorias) {
        this.nome = nome;
        this.preco = preco;
        this.categorias = new HashSet(categorias);
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

    public Set<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(Set<Categoria> categorias) {
        this.categorias = categorias;
    }

    public String getImagemCaminho() {
        return imagemCaminho;
    }

    public void setImagemCaminho(String imagemCaminho) {
        this.imagemCaminho = imagemCaminho;
    }
}
