

import { EventEmitter, Injectable } from "@angular/core";
import { Jogador } from "../Jogador";
import {HttpClient} from '@angular/common/http'
import { filter, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class servico {

  private apiUrl = 'http://localhost:3000/jogadores'

  public emitEvent = new EventEmitter();


  constructor(private http: HttpClient) {}

  getAll(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.apiUrl).pipe(
      res => res,
      error => error
    )
  }

  pushJogador(nome: string): Observable<Jogador> {

    return this.http.post<Jogador>(this.apiUrl, {nome: nome, situacao: true, saldo:0, imagem:"teste" }).pipe(
      res => res,
      error => error
    )
  }

  addJogadorAlert(value: Jogador) {
    return this.emitEvent.emit(value);
  }


deletaJogador(index: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${index}`).pipe(
    res => res,
  )
}

editaSituacaoJogador(id: number, situacao: boolean, saldo:number, nome: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, {nome: nome, situacao: situacao, saldo: saldo, imagem:"teste" }  ).pipe(
    res => res,
  )
}



}
