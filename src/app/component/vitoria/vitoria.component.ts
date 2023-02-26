import { servico } from './../../serviços/servico';
import { Jogador } from 'src/app/Jogador';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vitoria',
  templateUrl: './vitoria.component.html',
  styleUrls: ['./vitoria.component.scss']
})
export class VitoriaComponent {
  favoriteSeason!: string;
    @Input() public jogadores: Jogador[] = [];

  controlePartidas: number = 1;

  constructor (private servico: servico) {}

  escolherVencedor() {
    this.servico.pushPartida(this.favoriteSeason, this.controlePartidas).subscribe(
      res => {
        console.log(res);
        this.controlePartidas += 1
      }
    )
  }



}
