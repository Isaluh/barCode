package com.bamboobyte.API.services;


import com.bamboobyte.API.models.Venda;
import com.bamboobyte.API.repositories.VendasRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendasServiceImpl {
    @Autowired
    private VendasRespository vendasRespository;

    public Iterable<Venda> findaAllVendas() {
        return this.vendasRespository.findAll();
    }
    public List<Venda> findAllByMesa(int numMesa) {
        return this.vendasRespository.findAllByMesa(numMesa);
    }
    public Venda novaVenda(Venda venda) {
        venda.setId(null);
        return vendasRespository.save(venda);
    }
    public Venda saveVenda(Venda venda) {
        return vendasRespository.save(venda);
    }

}
