import { HttpClient, HttpParams } from "@angular/common/http";
import { Mesa } from "../models/models";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./localStorage.service";

@Injectable({providedIn: 'root'})

export class MesasService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";

    constructor(private httpClient:HttpClient, private localStorageService : LocalStorageService) {}
    
    setQntdMesa(numMesa : number, qntdPessoas : number){
        const formData = new FormData();
        this.localStorageService.adicionarLogin(formData)
        formData.append("numero", String(numMesa))
        formData.append("quantidade", String(qntdPessoas))

        return this.httpClient.post<any>(MesasService.API_url + "/mesa/set/quantidade", formData)
    }

    fecharMesa(numMesa : number){
        const formData = new FormData();
        this.localStorageService.adicionarLogin(formData)
        formData.append("numero", String(numMesa))

        return this.httpClient.post<any>(MesasService.API_url + "/mesa/fechar", formData)
    }

    pagarComanda(numMesa : number, formaPagamento : string){
        const formData = new FormData();
        this.localStorageService.adicionarLogin(formData)
        formData.append("numero", String(numMesa))
        formData.append("formaPagamento", formaPagamento)

        return this.httpClient.post<any>(MesasService.API_url + "/mesa/pagar", formData)
    }

    adicionarMesa(numMesa : number){
        const formData = new FormData();
        this.localStorageService.adicionarLogin(formData)
        formData.append("numero", String(numMesa))

        return this.httpClient.post<any>(MesasService.API_url + "/mesa/new", formData)
    }

    getMesas(){
        let url : string = MesasService.API_url + `/mesa/all?username=${this.localStorageService.getLogin().usuario}&password=${this.localStorageService.getLogin().senha}`;
        return this.httpClient.get<Mesa[]>(url)
    }
}