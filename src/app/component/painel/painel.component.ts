import { filter } from 'rxjs';
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
//displayedColumns = ['nome', 'situacao', 'partidas', 'saldo', 'lixeira', 'edite', 'ativo', 'pagamento'];


constructor(private servico: servico) {

}

ngOnInit(): void {

  this.servico.getAll().subscribe(
    res => this.jogadores = res
  );


  this.servico.emitEvent.subscribe(
    res => {
      alert(`Jogador ${res.nome} cadastrado`);
      return this.jogadores.push(res);
    }
  );

}

deletarJogador(Id: number) {
  this.servico.deletaJogador(Id).subscribe(
    res => {
      this.jogadores = this.jogadores.filter(
        item => {
          return Id !== item.id
        }
      )
    }
  )
}

alteraSituacaoJogador(id: number, situacao: boolean, index: number, nome: string, saldo: number) {
  situacao = !situacao;
  this.servico.editaSituacaoJogador(id, situacao, saldo, nome ).subscribe(
    res =>  {
    return  this.jogadores[index].situacao = res.situacao
    }

  )
}


}
