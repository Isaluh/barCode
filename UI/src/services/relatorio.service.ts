import { HttpClient, HttpParams } from "@angular/common/http";
import { RelatorioTabela } from "../models/models";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./localStorage.service";


@Injectable({providedIn: 'root'})

export class RelatorioService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";
    
    constructor(private httpClient:HttpClient, private localStorageService : LocalStorageService) {}

    getVendasAll(){
        let url : string = RelatorioService.API_url + `/relatorio/all?username=${this.localStorageService.getLogin().usuario}&password=${this.localStorageService.getLogin().senha}`;
        return this.httpClient.get<RelatorioTabela[]>(url)
    }

    getVendas(){
        let url : string = RelatorioService.API_url + `/relatorio/diaria?username=${this.localStorageService.getLogin().usuario}&password=${this.localStorageService.getLogin().senha}`;
        return this.httpClient.get<RelatorioTabela[]>(url)
    }

    gerarRelatorio(inicio : string, fim : string, value : string){
        const formData = new FormData();
        this.localStorageService.adicionarLogin(formData)
        formData.append("inicio", inicio)
        formData.append("fim", fim)
        if(Number.isNaN(value)){
            formData.append("produto", value)
        }
        else{
            formData.append("numero", value)
        }

        return this.httpClient.post<any>(RelatorioService.API_url + "/relatorio/intervalo", formData)
    }
}

