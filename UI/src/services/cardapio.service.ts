import { HttpClient } from "@angular/common/http";
import { Categorias } from "../models/models";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class CardapioService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";
    // public static API_url: string = "http://10.144.29.77:8080";
    constructor(private httpClient:HttpClient) {}

    getTopicosCardapio(){
        let url : string = CardapioService.API_url + "/categoria/all";
        return this.httpClient.get<Categorias[]>(url)
    }
}