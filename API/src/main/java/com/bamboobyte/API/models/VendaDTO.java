package com.bamboobyte.API.models;

import com.bamboobyte.API.utils.Validador;

public class VendaDTO {
    private Long numero;
    private Long data;
    private Integer numMesa;
    private float valor;
    private String meioPagamento;

    public VendaDTO(Venda venda) {
        this.numero = venda.getId();
        this.numMesa = venda.getMesa();
        this.data = venda.getData();
        this.valor = venda.getValor();
        this.meioPagamento = venda.getPagamento();
    }

    public VendaDTO(Long numero, Long data, Integer numMesa, float valor, String meioPagamento) {
        this.numero = numero;
        this.data = data;
        this.numMesa = numMesa;
        this.valor = valor;
        this.meioPagamento = meioPagamento;
    }

    public VendaDTO() {
    }



    public String getNumero() {
        return String.format("%3d", this.numero);
    }

    public void setNumero(Long numero) {
        this.numero = numero;
    }

    public String getData() {
        return Validador.converteData(this.data);
    }

    public void setData(Long data) {
        this.data = data;
    }

    public Integer getNumMesa() {
        return this.numMesa;
    }

    public void setNumMesa(Integer numMesa) {
        this.numMesa = numMesa;
    }

    public String getValor() {
        return String.format("%.2f", this.valor);
    }

    public void setValor(float valor) {
        this.valor = valor;
    }

    public String getMeioPagamento() {
        return meioPagamento;
    }

    public void setMeioPagamento(String meioPagamento) {
        this.meioPagamento = meioPagamento;
    }
}
