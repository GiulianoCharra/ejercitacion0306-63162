import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Empresa } from "../models/Empresa";

@Injectable({
  providedIn: "root"
})
export class EmpresasService {
  resourceURL: string;
  constructor(private httpClient: HttpClient) {
    this.resourceURL = "https://pavii.ddns.net/api/empresas/";
  }
  get():Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(this.resourceURL);
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceURL + Id);
  }

  post(obj: Empresa) {
    return this.httpClient.post(this.resourceURL, obj);
  }

  put(Id: number, obj: Empresa) {
    return this.httpClient.put(this.resourceURL + Id, obj);
  }

  delete(Id) {
    return this.httpClient.delete(this.resourceURL + Id);
  }
}
