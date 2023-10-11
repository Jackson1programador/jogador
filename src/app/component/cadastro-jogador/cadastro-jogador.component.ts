import { servico } from './../../serviços/servico';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-cadastro-jogador',
  templateUrl: './cadastro-jogador.component.html',
  styleUrls: ['./cadastro-jogador.component.scss']
})
export class CadastroJogadorComponent implements OnInit {

  jogador: string = '';
  backEndActive:Boolean = false;

  constructor(private servico: servico) {

   }

  ngOnInit(): void {
    this.backEndActive = this.servico.backEndActive;
  }

  addJogador(nome: string) {
    if(this.backEndActive){
      return this.servico.pushJogador(nome).subscribe(
        res => {
          this.servico.addJogadorAlert(res);
          this.jogador = '';
        }
      )
    } else return

  }

// lógica rpo app funcionar sem o back-end
  addJogadorFront(nome: string) {
    if(!this.backEndActive){
      this.servico.pushJogadorFront(nome);
      this.jogador = '';
    }

  }



}
