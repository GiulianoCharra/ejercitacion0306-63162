import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of, Observable } from "rxjs";
import { Articulo } from "../models/articulo";
import { ArticuloFamilia } from "../models/articulo-familia";

@Injectable({
  providedIn: "root"
})
export class ArticulosFamiliasService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    // la barra al final del resourse url es importante para los metodos que concatenan el id del recurso (GetById, Put)
    this.resourceUrl = "https://pavii.ddns.net/api/ArticulosFamilias/";
  }

  get(): Observable<ArticuloFamilia[]> {
    return this.httpClient.get<ArticuloFamilia[]>(this.resourceUrl);
  }

  getId(id: number): Observable<ArticuloFamilia[]> {
    return this.httpClient.get<ArticuloFamilia[]>(this.resourceUrl + id);
  }
}
