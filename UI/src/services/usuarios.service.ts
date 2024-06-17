import { HttpClient, HttpParams } from "@angular/common/http";
import { Usuario } from "../models/models";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./localStorage.service";

@Injectable({providedIn: 'root'})

export class UsuariosService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";

    constructor(private httpClient:HttpClient, private localStorageService : LocalStorageService) {}

    cadastro(infoUsuario : any){
        const formData = new FormData();
        this.localStorageService.adicionarLogin(formData)
        formData.append("cpf", infoUsuario.cpf)
        formData.append("nome", infoUsuario.nome)
        formData.append("senha", infoUsuario.senha)
        
        return this.httpClient.post<any>(UsuariosService.API_url + "/garcom/new", formData)
    }

    getUsuarios(){
        let url : string = UsuariosService.API_url + `/garcom/all?username=${this.localStorageService.getLogin().usuario}&password=${this.localStorageService.getLogin().senha}`;
        return this.httpClient.get<Usuario[]>(url)
    }

    trocarTaxa(taxa : number){
        const formData = new FormData();
        this.localStorageService.adicionarLogin(formData)
        formData.append("taxa", String(taxa))
        
        return this.httpClient.post<string>(UsuariosService.API_url + "/garcom/set/taxa", formData)
    }

    deleteUsuarios(usuario : number){
        const formData = new FormData();
        this.localStorageService.adicionarLogin(formData)
        formData.append("cpf", String(usuario))
        
        return this.httpClient.post<string>(UsuariosService.API_url + "/garcom/delete", formData)
    }
}