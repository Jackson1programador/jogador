import { servico } from './../../serviços/servico';
import { Jogador } from 'src/app/Jogador';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vitoria',
  templateUrl: './vitoria.component.html',
  styleUrls: ['./vitoria.component.scss']
})
export class VitoriaComponent implements OnInit {
  favoriteSeason: string = "";
  public controlePartidas: number = 1;
  backEndActive:Boolean = false;
  @Input() public jogadores: Jogador[] = [];
  @Output() public avisaVencedor = new EventEmitter();
  @Output() public avisaVencedorFront = new EventEmitter();
  @Output() public repassandoAExclusao = new EventEmitter();
  @Output() public repassandoAExclusaoFront = new EventEmitter();


  constructor (private servico: servico) {}

  ngOnInit(): void {

    this.backEndActive = this.servico.backEndActive
    this.servico.avisaQueOBackSubiu.subscribe(
      res => {this.backEndActive = res;
        if(this.backEndActive){
          this.servico.getAllHistorico().subscribe(
            res => this.controlePartidas = res.length + 1
          );
        }
    })

    this.servico.deletaTudoEmit.subscribe(
      res => {this.controlePartidas = 1}
    )

  }

  escolherVencedor() {
    if(this.backEndActive){
      let found = this.jogadores.find( element => element.nome == this.favoriteSeason )

      if(this.favoriteSeason == "") {
        return alert("Escolha um jogador")
      }
      if (found?.situacao == false) {
        return alert("Escolha um jogador ativo")
      }
      else {
        this.servico.pushPartida(this.favoriteSeason, this.controlePartidas).subscribe(
          res => {
            this.controlePartidas += 1;
            this.servico.addVencedorAlert(res)
            this.favoriteSeason = ""
            this.avisaVencedor.emit(res.vencedor)

          }
        )
      }
    }
  }

  escolherVencedorFront() {
    if(!this.backEndActive){
      let found = this.jogadores.find( element => element.nome == this.favoriteSeason )

      if(this.favoriteSeason == "") {
        return alert("Escolha um jogador")
      }
      if (found?.situacao == false) {
        return alert("Escolha um jogador ativo")
      }
      else {
        this.servico.pushPartidaFront(this.favoriteSeason, this.controlePartidas)
        this.controlePartidas += 1;
        this.avisaVencedorFront.emit(this.favoriteSeason)
        this.favoriteSeason = ""
      }
    }
  }

  exclusaoEscultada() {
    if(this.backEndActive){
      this.controlePartidas--
    }
  }

  exclusaoEscultadaFront() {
    if(!this.backEndActive){
      this.controlePartidas--
    }
  }

  repassandoEmit(nome: string) {
    if(this.backEndActive){
      this.repassandoAExclusao.emit(nome);
    }
  }

  repassandoEmitFront(nome: string) {
    if(!this.backEndActive){
      this.repassandoAExclusaoFront.emit(nome);
    }
  }

}
