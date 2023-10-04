import { filter } from 'rxjs';
import { servico } from './../../serviços/servico';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Jogador } from 'src/app/Jogador';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent  implements OnInit {

valorDaPartida: number = 2.50
jogadores:Jogador[] = [];
public situacaoContainerPagamento: boolean = false;
public pagador: string = ""

jogadoresFront:Jogador[] = [];
jogadoresBack:Jogador[] = [];





constructor(private servico: servico) {

}

ngOnInit(): void {


  this.servico.getAll().subscribe(
    res => this.jogadores = res

  );


  this.servico.emitEvent.subscribe(
    res => {
      alert(`Jogador ${res.nome} cadastrado`);
      this.jogadoresBack.push(res);
      this.verificaBack()

    }
  );

  this.servico.emitEventFront.subscribe(
    res => {
      alert(`Jogador ${res.nome} cadastrado`);
      const jogadorSemId = res
      const Id = (this.jogadoresFront.length) + 1
      jogadorSemId.id = Id
      this.jogadoresFront.push(jogadorSemId);
      this.verificaBack()
    }
  );






}

verificaBack(){
  if(this.jogadoresBack.length > 0){
    this.jogadores = this.jogadoresBack
  } else{
    this.jogadores = this.jogadoresFront
  }
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

deletarJogadorFront(Id: number) {
      this.jogadoresFront = this.jogadoresFront.filter(
        item => {
          return Id !== item.id
        }
      )
      this.verificaBack()
}

alteraSituacaoJogador(id: number, situacao: boolean, index: number, nome: string, saldo: number) {
  situacao = !situacao;
  this.servico.editaSituacaoJogador(id, situacao, saldo, nome ).subscribe(
    res =>  {
    return  this.jogadores[index].situacao = res.situacao
    }

  )
}

alteraSituacaoJogadorFront (id: number) {
  this.jogadoresFront.forEach((elemento)=> {
    if(elemento.id == id ){
       elemento.situacao = !elemento.situacao
    }
  })
  this.verificaBack()
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

alteraSaldoFront(nome: string)  {
  let valor = this.valorDaPartida;
  let listaInativa: Jogador[] = this.criaListaDeJogadoresSoInativoFront();
  let listaAtiva: Jogador[] = this.criaListaDeJogadoresSoAtivoFront();

  let novaListaAtiva = listaAtiva.map((element) => {
    if(element.nome == nome) {
      element.saldo = element.saldo + (valor * (listaAtiva.length - 1))
      return element
    } else {
      element.saldo = element.saldo - valor
      return element
    }
  })



  let listaFinal = novaListaAtiva.concat(listaInativa)
  this.jogadoresFront = listaFinal
  console.log(this.jogadoresFront)
  this.verificaBack()
  return this.jogadoresFront
}


criaListaDeJogadoresSoAtivo () {
  let lista: Jogador[] = this.jogadores.filter(elemento => elemento.situacao === true);
   return lista
}

criaListaDeJogadoresSoInativo () {
  let lista: Jogador[] = this.jogadores.filter(elemento => elemento.situacao !== true);
  return lista
}

criaListaDeJogadoresSoAtivoFront () {
  let lista: Jogador[] = this.jogadoresFront.filter(elemento => elemento.situacao === true);
   return lista
}

criaListaDeJogadoresSoInativoFront () {
  let lista: Jogador[] = this.jogadoresFront.filter(elemento => elemento.situacao !== true);
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


corrigeSaldo(nome: string) {
  let valor = this.valorDaPartida;
  let listaInativa: Jogador[] = this.criaListaDeJogadoresSoInativo();
  let listaAtiva: Jogador[] = this.criaListaDeJogadoresSoAtivo();

  let novaListaAtiva = listaAtiva.map((element) => {
    if(element.nome == nome) {
      element.saldo = element.saldo - (valor * (listaAtiva.length - 1))
      return element
    } else {
      element.saldo = element.saldo + valor
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

pagamento(nome: any) {
  this.situacaoContainerPagamento = true
  this.pagador = nome

}

fechaContainerPagamento() {
  this.situacaoContainerPagamento = false
}




}
