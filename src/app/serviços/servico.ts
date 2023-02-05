
import { Injectable } from "@angular/core";
import { Jogador } from "../Jogador";
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class servico {
  private apiUrl = 'http://localhost:3000/jogadores'

  constructor(private http: HttpClient) {}

  getAll(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.apiUrl)
  }
}
