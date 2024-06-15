import { HttpClient } from "@angular/common/http";
import { RelatorioTabela } from "../models/models";
import { Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})

export class RelatorioService{
    public static API_url: string = "https://743b-45-176-18-211.ngrok-free.app";
    // public static API_url: string = "http://10.144.29.77:8080"
    
    constructor(private httpClient:HttpClient) {

    }

    getVendas(){
        let url : string = RelatorioService.API_url + "/relatorio/all";
        return this.httpClient.get<RelatorioTabela[]>(url)
    }
}

