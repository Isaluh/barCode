import { HttpClient, HttpParams } from "@angular/common/http";
import { Produto } from "../models/models";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./localStorage.service";

@Injectable({providedIn: 'root'})

export class ProdutosService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";

    constructor(private httpClient:HttpClient, private localStorageService : LocalStorageService) {}

    getProdutosAll() {
        let url: string = ProdutosService.API_url + "/produto/all";
        return this.httpClient.get<Produto[]>(url);
    }
  
    getProdutos(categoria:string) {
        let url: string = ProdutosService.API_url + `/categoria/${categoria}/produtos?username=${this.localStorageService.getLogin().usuario}&password=${this.localStorageService.getLogin().senha}`
        return this.httpClient.get<Produto[]>(url);
    }
}