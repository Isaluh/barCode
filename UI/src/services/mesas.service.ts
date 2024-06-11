import { HttpClient } from "@angular/common/http";
import { Mesa } from "../models/models";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class MesasService{
    // public static API_url: string = "https://a26c-45-176-18-158.ngrok-free.app";
    public static API_url: string = "http://10.144.29.77:8080";
    constructor(private httpClient:HttpClient) {

    }
    
    setQntdMesa(numMesa : number, qntdPessoas : number){
        const formData = new FormData();
        formData.append("numero", String(numMesa))
        formData.append("quantidade", String(qntdPessoas))

        return this.httpClient.post<any>(MesasService.API_url + "/mesa/set/quantidade", formData)
    }

    fecharMesa(numMesa : number){
        const formData = new FormData();
        formData.append("numero", String(numMesa))

        return this.httpClient.post<any>(MesasService.API_url + "/mesa/fechar", formData)
    }

    pagarComanda(numMesa : number){
        const formData = new FormData();
        formData.append("numero", String(numMesa))

        return this.httpClient.post<any>(MesasService.API_url + "/mesa/pagar", formData)
    }

    adicionarMesa(numMesa : number){
        const formData = new FormData();
        formData.append("numero", String(numMesa))

        return this.httpClient.post<any>(MesasService.API_url + "/mesa/new", formData)
    }

    getMesas(){
        let url : string = MesasService.API_url + "/mesa/all";
        return this.httpClient.get<Mesa[]>(url)
    }
}