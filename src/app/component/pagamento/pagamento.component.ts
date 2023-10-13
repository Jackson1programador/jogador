import { servico } from './../../serviços/servico';
import { Jogador } from './../../Jogador';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  @Input() public jogadores: Jogador[] = [];
  @Input() public pagador: string = ""
  @Output() public fechaContainerPagamento: any = new EventEmitter()
  public recebedor:string = ""
  backEndActive:Boolean = false;
  public valor!: number

  constructor (private servico: servico) {}

  ngOnInit(): void {
    this.backEndActive = this.servico.backEndActive
    this.servico.avisaQueOBackSubiu.subscribe(
      res => {this.backEndActive = res;
    })
  }

  efetivaPagamento(nome: any) {
    this.recebedor = nome.value.recebedor

    if(nome.value.recebedor == "") {
      alert("Selecione o jogador que vai receber o dinheiro")
    }
    else {
      let novaLista = this.jogadores.map( (item) => {
        if(item.nome == this.recebedor) {
          item.saldo -= this.valor}
        if(item.nome == this.pagador) {
          item.saldo += this.valor}
        return item
     })

      if(this.backEndActive){
        novaLista.forEach( (item) => {
          this.servico.editaSituacaoJogador(item.id, item.situacao, item.saldo, item.nome ).subscribe(
            res => res
          )
        })
      }

      this.fechaContainerPagamento.emit()
    }

  }

  cancelarPagamento(){
    this.fechaContainerPagamento.emit()
  }

}
