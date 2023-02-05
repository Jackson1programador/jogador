import { servico } from './../../serviços/servico';
import { Component, OnInit } from '@angular/core';
import { Jogador } from 'src/app/Jogador';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent  implements OnInit {

valorDaPartida: number = 2.50
jogadores:Jogador[] = [];
displayedColumns = ['nome', 'situacao', 'partidas', 'saldo', 'lixeira', 'edite', 'ativo', 'pagamento'];


constructor(private servico: servico) {
  this.getJogador()
}

ngOnInit(): void {}

getJogador(): void {
  this.servico.getAll().subscribe((jagador) => (this.jogadores = jagador))
}


}
