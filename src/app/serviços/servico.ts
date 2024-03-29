

import { EventEmitter, Injectable } from "@angular/core";
import { Jogador } from "../Jogador";
import {HttpClient} from '@angular/common/http'
import { elementAt, filter, Observable } from "rxjs";
import { Partidas } from "../partidas";

@Injectable({
  providedIn: 'root',
})

export class servico {

  private apiUrl = 'http://localhost:3000/jogadores'
  private apiUrlPartidas = 'http://localhost:3000/partidas'
  public backEndActive:Boolean = false;

  public emitEvent = new EventEmitter();
  public vencedorEmitEvent = new EventEmitter();
  public apagandoVencedorEmitEvent = new EventEmitter();
  public avisaQueOBackSubiu = new EventEmitter();
  public informaValor = new EventEmitter();
  public deletaTudoEmit = new EventEmitter();

  public emitEventFront = new EventEmitter();
  public vencedorEmitEventFront = new EventEmitter();
  public vencedorEmitEventAlertFront = new EventEmitter();
  public apagandoVencedorEmitEventFront = new EventEmitter();



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

  pushPartida(nome: string, partida: number): Observable<Partidas> {
    return this.http.post<Partidas>(this.apiUrlPartidas, {vencedor: nome, partida: partida }).pipe(
      res => res,
      error => error
    )
  }

  getAllHistorico(): Observable<Partidas[]> {
    return this.http.get<Partidas[]>(this.apiUrlPartidas).pipe(
      res => res,
      error => error
    )
  }

  addVencedorAlert(value: Partidas) {
    return this.vencedorEmitEvent.emit(value);
  }

  excluiVencedorBackEnd(index: number): Observable<any>{
    return this.http.delete(`${this.apiUrlPartidas}/${index}`).pipe(
      res => res,
    )
  }

  InformaQueTemBackEnd(){
    this.backEndActive = true;
    this.avisaQueOBackSubiu.emit(this.backEndActive)
  }

  InformaValor(valor: number){
    this.informaValor.emit(valor)
  }

  deletaTudo(){

    const confirmacao = confirm("Você tem certeza de que deseja excluir tudo?");

    if (confirmacao) {
          this.getAll().subscribe(
            res => {
              res.forEach((element) => {
                this.deletaJogador(element.id).subscribe(
                  res => res
                )
              });
            }
          )

          this.getAllHistorico().subscribe(
            res => {
              res.forEach((element) => {
                this.excluiVencedorBackEnd(element.id).subscribe(
                  res => res
                )
              })
            }
          )

          this.deletaTudoEmit.emit()
    }
  }

  //lógica pro app funcionar sem back-end
  public jogadorObject: any = [];

  pushJogadorFront(nome: string): Observable<Jogador> {
    var jogador: any = {nome: nome, situacao: true, saldo:0, imagem:"teste", id: 0 }
    this.jogadorObject.push(jogador);
    this.emitEventFront.emit(jogador);
    return jogador
  }

  pushPartidaFront(nome: string, partida: number): Observable<Partidas> {
    var partidaAtual: any = {vencedor:nome, partida: partida}
    this.vencedorEmitEventFront.emit(partidaAtual)
    return partidaAtual
  }

  addVencedorAlertFront(value: Partidas) {
    return this.vencedorEmitEventAlertFront.emit(value);
  }


}
