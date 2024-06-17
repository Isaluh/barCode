import { HttpClient, HttpParams } from "@angular/common/http";
import { Categorias, Comanda } from "../models/models";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./localStorage.service";

@Injectable({providedIn: 'root'})

export class CardapioService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";

    constructor(private httpClient:HttpClient, private localStorageService : LocalStorageService) {}

    getTopicosCardapio(){
        let url : string = CardapioService.API_url + `/categoria/all?username=${this.localStorageService.getLogin().usuario}&password=${this.localStorageService.getLogin().senha}`;
        return this.httpClient.get<Categorias[]>(url)
    }

    getComanda(mesa : number){
        let url : string = CardapioService.API_url + `/mesa/${mesa}?username=${this.localStorageService.getLogin().usuario}&password=${this.localStorageService.getLogin().senha}`;
        return this.httpClient.get<Comanda>(url)
    }

    addProdutoComanda(mesa : number, produto : string){
        const formData = new FormData();
        this.localStorageService.adicionarLogin(formData)
        formData.append("numero", String(mesa))
        formData.append("produto", produto)
        
        return this.httpClient.post<any>(CardapioService.API_url + "/mesa/add/produto", formData)
    }
    
}