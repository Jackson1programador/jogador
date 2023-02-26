import { servico } from './../../serviços/servico';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-cadastro-jogador',
  templateUrl: './cadastro-jogador.component.html',
  styleUrls: ['./cadastro-jogador.component.scss']
})
export class CadastroJogadorComponent implements OnInit {

  jogador: string = '';

  constructor(private servico: servico) {

   }

  ngOnInit(): void {}

  addJogador(nome: string) {
    return this.servico.pushJogador(nome).subscribe(
      res => this.servico.addJogadorAlert(res)
    )
  }

}
