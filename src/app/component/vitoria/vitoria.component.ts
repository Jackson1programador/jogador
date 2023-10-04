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
    @Input() public jogadores: Jogador[] = [];
    @Output() public avisaVencedor = new EventEmitter();
    @Output() public avisaVencedorFront = new EventEmitter();
    @Output() public repassandoAExclusao = new EventEmitter();


    public controlePartidas: number = 1;

  constructor (private servico: servico) {}


  escolherVencedor() {
    let found = this.jogadores.find( element => element.nome == this.favoriteSeason )


    if(this.favoriteSeason == "") {
      alert("Escolha um jogador")
    }
    if (found?.situacao == false) {
      alert("Escolha um jogador ativo")
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

  escolherVencedorFront() {
    let found = this.jogadores.find( element => element.nome == this.favoriteSeason )


    if(this.favoriteSeason == "") {
      alert("Escolha um jogador")
    }
    if (found?.situacao == false) {
      alert("Escolha um jogador ativo")
    }
    else {
      this.servico.pushPartidaFront(this.favoriteSeason, this.controlePartidas)
      this.controlePartidas += 1;
      this.avisaVencedorFront.emit(this.favoriteSeason)
      this.favoriteSeason = ""
    }
  }

  exclusaoEscultada() {
    this.controlePartidas--
  }





  ngOnInit(): void {

    this.servico.getAllHistorico().subscribe(
      res => this.controlePartidas = res.length + 1
    );








  }

  repassandoEmit(nome: string) {

    this.repassandoAExclusao.emit(nome);
  }




}