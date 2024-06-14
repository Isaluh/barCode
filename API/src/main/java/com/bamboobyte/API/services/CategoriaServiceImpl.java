package com.bamboobyte.API.services;

import com.bamboobyte.API.models.Categoria;
import com.bamboobyte.API.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CategoriaServiceImpl implements CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    public Iterable<Categoria> listAllCategoria() {
        return categoriaRepository.findAll();
    }

    @Override
    public Optional<Categoria> getCategoriaByNome(String nome) {
        return categoriaRepository.findByNome(nome);
    }

    @Override
    public Categoria saveCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public void deleteCategoria(Long id) {
        categoriaRepository.deleteById(id);
    }
}
