import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";


@Injectable({providedIn: 'root'})

export class LocalStorageService{
  private storage: Storage;

  constructor() {this.storage = window.localStorage}

  getLogin(){
    return {"usuario" : this.storage.getItem("username"), "senha" : this.storage.getItem("password"), "rota": this.storage.getItem("rota"), "acessLevel" : this.storage.getItem("acessLevel")}
  }

  setLogin(username: string, password: string, acessLevel : string) {
    this.storage.setItem("username", username);
    this.storage.setItem("password", password);
    this.storage.setItem("acessLevel", acessLevel);
  }

  setRota(rota : string){
    this.storage.setItem("rota", rota)
  }

  setPagamento(visivel : string){
    this.storage.setItem("pagamento", visivel)
  }

  getPagamento(){
    return {"pagamento" : this.storage.getItem("pagamento")}
  }

  removeLogin(){
    this.storage.removeItem("username")
    this.storage.removeItem("password")
  }

  adicionarLogin(formdata : FormData | HttpParams){
    formdata.append("username", String(this.getLogin().usuario))
    formdata.append("password", String(this.getLogin().senha))
}
}

