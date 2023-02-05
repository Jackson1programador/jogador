import { servico } from './../../serviços/servico';
import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

import { Jogador } from 'src/app/Jogador';

@Component({
  selector: 'app-cadastro-jogador',
  templateUrl: './cadastro-jogador.component.html',
  styleUrls: ['./cadastro-jogador.component.scss']
})
export class CadastroJogadorComponent implements OnInit {

jogador: string = '';
jogadores:Jogador[] = [];



constructor(private servico: servico) {
  this.getJogador()
}

ngOnInit(): void {}

getJogador(): void {
  this.servico.getAll().subscribe(dados => this.jogadores = dados)
}

addJogador(): void {
  this.jogadores.push({nome: this.jogador , situacao: true, saldo: 0, imagem: '', id: 9 })
 this.jogador = ''
 console.log(this.jogadores)
}





}
