import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
  getEmp(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(this.resourceURL);
  }
  getEmpId(id: number) {
    return this.httpClient.get(this.resourceURL + id);
  }
}
