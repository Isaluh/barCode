import { HttpClient, HttpParams } from "@angular/common/http";
import { RelatorioTabela } from "../models/models";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./localStorage.service";


@Injectable({providedIn: 'root'})

export class RankingService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";
    
    constructor(private httpClient:HttpClient, private localStorageService : LocalStorageService) {}

    getRankingDay(){
        let url : string = RankingService.API_url + `/relatorio/all?username=${this.localStorageService.getLogin().usuario}&password=${this.localStorageService.getLogin().senha}`;
        return this.httpClient.get<RelatorioTabela[]>(url)
    }

    getRankingProduto(){
        let url : string = RankingService.API_url + `/relatorio/diaria?username=${this.localStorageService.getLogin().usuario}&password=${this.localStorageService.getLogin().senha}`;
        return this.httpClient.get<RelatorioTabela[]>(url)
    }
}

