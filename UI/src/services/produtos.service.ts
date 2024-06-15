import { HttpClient } from "@angular/common/http";
import { Produto } from "../models/models";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class ProdutosService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";
    // public static API_url: string = "http://10.144.29.77:8080";
    constructor(private httpClient:HttpClient) {}
  
    getProdutos(categoria:string) {
        let url: string = ProdutosService.API_url + `/categoria/${categoria}/produtos`
        return this.httpClient.get<Produto[]>(url);
    }

    // getProdutosPorcoes(){
    //     let url : string = ProdutosService.API_url + "/categoria/Porções/produtos";
    //     return this.httpClient.get<Produto[]>(url)
    // }

    // getProdutosPetiscos(){
    //     let url : string = ProdutosService.API_url + "/categoria/Petiscos/produtos";
    //     return this.httpClient.get<Produto[]>(url)
    // }

    // getProdutosPeixes(){
    //     let url : string = ProdutosService.API_url + "/categoria/Peixes/produtos";
    //     return this.httpClient.get<Produto[]>(url)
    // }

    // getProdutosCarnes(){
    //     let url : string = ProdutosService.API_url + "/categoria/Carnes/produtos";
    //     return this.httpClient.get<Produto[]>(url)
    // }

    // getProdutosSaladas(){
    //     let url : string = ProdutosService.API_url + "/categoria/Saladas/produtos";
    //     return this.httpClient.get<Produto[]>(url)
    // }

    // getProdutosBebidas(){
    //     let url : string = ProdutosService.API_url + "/categoria/Bebidas/produtos";
    //     return this.httpClient.get<Produto[]>(url)
    // }

    // getProdutosSobremesas(){
    //     let url : string = ProdutosService.API_url + "/categoria/Sobremesas/produtos";
    //     return this.httpClient.get<Produto[]>(url)
    // }
}