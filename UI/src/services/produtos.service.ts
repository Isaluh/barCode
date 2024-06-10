import { HttpClient } from "@angular/common/http";
import { Produto } from "../models/models";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class ProdutosService{
    public static API_url: string = "https://a26c-45-176-18-158.ngrok-free.app";

    constructor(private httpClient:HttpClient) {

    }
  
    getProdutos(){
        let url : string = ProdutosService.API_url + "/produto/all";
        return this.httpClient.get<Produto[]>(url)
    }
}