import { servico } from './../../serviços/servico';
import { Jogador } from 'src/app/Jogador';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vitoria',
  templateUrl: './vitoria.component.html',
  styleUrls: ['./vitoria.component.scss']
})
export class VitoriaComponent implements OnInit {
  favoriteSeason!: string;
    @Input() public jogadores: Jogador[] = [];


    public controlePartidas: number = 1;

  constructor (private servico: servico) {}


  escolherVencedor() {
    this.servico.pushPartida(this.favoriteSeason, this.controlePartidas).subscribe(
      res => {
        this.controlePartidas += 1;
        this.servico.addVencedorAlert(res)
        this.favoriteSeason = ""

      }
    )
  }

  exclusaoEscultada() {
    this.controlePartidas--
  }





  ngOnInit(): void {

    this.servico.getAllHistorico().subscribe(
      res => this.controlePartidas = res.length + 1
    );




  }



}
