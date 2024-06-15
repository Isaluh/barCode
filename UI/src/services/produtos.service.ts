import { HttpClient } from "@angular/common/http";
import { Produto } from "../models/models";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class ProdutosService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";

    constructor(private httpClient:HttpClient) {}
  
    getProdutos(categoria:string) {
        let url: string = ProdutosService.API_url + `/categoria/${categoria}/produtos`
        return this.httpClient.get<Produto[]>(url);
    }
}