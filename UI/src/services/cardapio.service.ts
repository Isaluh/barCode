import { HttpClient } from "@angular/common/http";
import { Categorias, Comanda } from "../models/models";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class CardapioService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";

    constructor(private httpClient:HttpClient) {}

    getTopicosCardapio(){
        let url : string = CardapioService.API_url + "/categoria/all";
        return this.httpClient.get<Categorias[]>(url)
    }

    getComanda(mesa : number){
        let url : string = CardapioService.API_url + `/mesa/${mesa}`;
        return this.httpClient.get<Comanda>(url)
    }

    addProdutoComanda(mesa : number, produto : string){
        const formData = new FormData();
        formData.append("numero", String(mesa))
        formData.append("produto", produto)
        
        return this.httpClient.post<any>(CardapioService.API_url + "/mesa/add/produto", formData)
    }
    
}