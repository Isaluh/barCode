import { HttpClient } from "@angular/common/http";
import { Usuario } from "../models/models";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class UsuariosService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";

    constructor(private httpClient:HttpClient) {}

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