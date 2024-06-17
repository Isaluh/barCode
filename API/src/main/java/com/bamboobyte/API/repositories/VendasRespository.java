package com.bamboobyte.API.repositories;

import com.bamboobyte.API.models.Taxa;
import com.bamboobyte.API.models.Venda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VendasRespository extends JpaRepository<Venda, Long> {

    List<Venda> findAllByMesa(Integer numMesa);

}
