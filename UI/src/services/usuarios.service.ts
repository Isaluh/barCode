import { HttpClient } from "@angular/common/http";
import { Usuario } from "../models/models";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class UsuariosService{
    public static API_url: string = "https://743b-45-176-18-211.ngrok-free.app";
    // public static API_url: string = "http://10.144.29.77:8080";
    constructor(private httpClient:HttpClient) {

    }

    cadastro(infoUsuario : any){
        const formData = new FormData();
        formData.append("cpf", infoUsuario.cpf)
        formData.append("nome", infoUsuario.nome)
        formData.append("senha", infoUsuario.senha)
        
        return this.httpClient.post<any>(UsuariosService.API_url + "/garcom/new", formData)
    }

    getUsuarios(){
        // ou /usuarios/all
        let url : string = UsuariosService.API_url + "/garcom/all";
        return this.httpClient.get<Usuario[]>(url)
    }
}