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

atualizaSaldo(id: number, situacao: boolean, saldo:number, nome: string){
  this.servico.editaSituacaoJogador(id, situacao, saldo, nome).subscribe(
    res => {
      return
    }
  )
}

alteraSaldo(nome: string)  {
  let valor = this.valorDaPartida;
  let listaInativa: Jogador[] = this.criaListaDeJogadoresSoInativo();
  let listaAtiva: Jogador[] = this.criaListaDeJogadoresSoAtivo();

  let novaListaAtiva = listaAtiva.map((element) => {
    if(element.nome == nome) {
      element.saldo = element.saldo + (valor * (listaAtiva.length - 1))
      return element
    } else {
      element.saldo = element.saldo - valor
      return element
    }
  })

  listaAtiva.forEach(element => {
    this.servico.editaSituacaoJogador(element.id, element.situacao, element.saldo, element.nome).subscribe(res => {
    return
   })});

  let listaFinal = novaListaAtiva.concat(listaInativa)
  return this.jogadores = listaFinal
}


criaListaDeJogadoresSoAtivo () {
  let lista: Jogador[] = this.jogadores.filter(elemento => elemento.situacao === true);
  console.log(lista)
  return lista
}

criaListaDeJogadoresSoInativo () {
  let lista: Jogador[] = this.jogadores.filter(elemento => elemento.situacao !== true);
  console.log(lista)
  return lista
}

eInativo(situacao: boolean) {
  return !situacao
}

eSaldoPositivo(saldo: number) {
  if(saldo > 0 ) {
    return true
  }
   return false
}

eSaldoNegativo(saldo: number) {
  if(saldo < 0 ) {
    return true
  }
  return false
}




}
