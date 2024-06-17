import { HttpClient } from "@angular/common/http";
import { Login } from "../models/models";
import { Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})

export class LoginService{
    public static API_url: string = "https://3afb-45-176-17-206.ngrok-free.app";
    
    constructor(private httpClient:HttpClient) {}

    verificarLogin(cpf : string, senha : string){
        const formData = new FormData();
        formData.append("username", cpf)
        formData.append("password", senha)

        return this.httpClient.post<Login>(LoginService.API_url + "/auth/login", formData)
    }
}

