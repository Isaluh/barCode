import { HttpClient } from "@angular/common/http";
import { Produto } from "../models/models";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class ProdutosService{
    public static API_url: string = "https://743b-45-176-18-211.ngrok-free.app";
    // public static API_url: string = "http://10.144.29.77:8080";
    constructor(private httpClient:HttpClient) {

    }
  
    getProdutos(){
        let url : string = ProdutosService.API_url + "/produto/all";
        return this.httpClient.get<Produto[]>(url)
    }
}