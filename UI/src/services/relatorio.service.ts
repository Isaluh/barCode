import { HttpClient } from "@angular/common/http";
import { RelatorioTabela } from "../models/models";
import { Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})

export class RelatorioService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";
    
    constructor(private httpClient:HttpClient) {}

    getVendas(){
        let url : string = RelatorioService.API_url + "/relatorio/all";
        return this.httpClient.get<RelatorioTabela[]>(url)
    }
}

