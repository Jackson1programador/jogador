import { filter } from 'rxjs';
import { servico } from './../../serviços/servico';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Jogador } from 'src/app/Jogador';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent  implements OnInit {

  valorDaPartida: number = 2.50
  jogadores:Jogador[] = [];
  jogadoresFront:Jogador[] = [];
  jogadoresBack:Jogador[] = [];
  public situacaoContainerPagamento: boolean = false;
  public pagador: string = "";
  backEndActive:Boolean = false;

  constructor(
    private servico: servico,
    public dialog: MatDialog
    ) {}



  ngOnInit(): void {

    this.openDialog('0ms', '0ms');
    this.servico.avisaQueOBackSubiu.subscribe(
      res => {this.backEndActive = res;
        if(this.backEndActive){
          this.servico.getAll().subscribe(
            res => this.jogadores = res );
        }
        if(this.backEndActive){
          this.servico.getAll().subscribe(
            res => this.jogadores = res );
        }

        if(this.backEndActive){
          this.servico.emitEvent.subscribe(
            res => {
              alert(`Jogador ${res.nome} cadastrado`);
              this.jogadoresBack.push(res);
              this.verificaBack()
              this.jogadoresBack = [];
            })
          };
    })

    this.servico.informaValor.subscribe(
      res => {
        this.valorDaPartida = res
      }
    )

    this.servico.deletaTudoEmit.subscribe(
      res => {
      this.jogadores = [];
      this.jogadoresBack = [];
      this.jogadoresFront = [];
      }
    )





    if(!this.backEndActive){
      this.servico.emitEventFront.subscribe(
        res => {
          alert(`Jogador ${res.nome} cadastrado`);
          const jogadorSemId = res
          const Id = (this.jogadoresFront.length) + 1
          jogadorSemId.id = Id
          this.jogadoresFront.push(jogadorSemId);
          this.verificaBack()
        })
    };

  }

  verificaBack(){
    if(this.jogadoresBack.length > 0){
      this.jogadores = this.jogadores.concat(this.jogadoresBack)
    } else{
      this.jogadores = this.jogadoresFront
    }
  }

  deletarJogador(jogador: Jogador) {
    if(this.backEndActive){
      if(jogador.saldo == 0){
        this.servico.deletaJogador(jogador.id).subscribe(
          res => {
            this.jogadores = this.jogadores.filter(
              item => {
                return jogador.id !== item.id
              }
            )
          }
        )
      } else{
        alert(`O jogador ${jogador.nome} não possui saldo zerado`)
      }
    }
  }

  deletarJogadorFront(jogador: Jogador) {
    if(!this.backEndActive){
      if(jogador.saldo == 0){
        this.jogadoresFront = this.jogadoresFront.filter(
          item => {
            return jogador.id !== item.id
          }
        )
        this.verificaBack()
      }  else{
        alert(`O jogador ${jogador.nome} não possui saldo zerado`)
      }
    }

  }

  alteraSituacaoJogador(id: number, situacao: boolean, index: number, nome: string, saldo: number) {
    if(this.backEndActive){
      situacao = !situacao;
      this.servico.editaSituacaoJogador(id, situacao, saldo, nome ).subscribe(
        res =>  {
        return  this.jogadores[index].situacao = res.situacao
        }
      )
    }
  }

  alteraSituacaoJogadorFront (id: number) {
    if(!this.backEndActive){
      this.jogadoresFront.forEach((elemento)=> {
        if(elemento.id == id ){
          elemento.situacao = !elemento.situacao
        }
      })
      this.verificaBack()
    }
  }

  atualizaSaldo(id: number, situacao: boolean, saldo:number, nome: string){
    this.servico.editaSituacaoJogador(id, situacao, saldo, nome).subscribe(
      res => {
        return
      }
    )
  }

  alteraSaldo(nome: string)  {
    if(this.backEndActive){
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
    } else{
      return
    }
  }

  alteraSaldoFront(nome: string)  {
    if(!this.backEndActive){
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
      this.verificaBack()
      return this.jogadoresFront
    } else{
      return
    }
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
    if(this.backEndActive){
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

      let listaFinal = novaListaAtiva.concat(listaInativa)
      this.jogadoresFront = listaFinal
      this.verificaBack()
      return  this.jogadoresFront
    } else{
      return
    }

  }

  corrigeSaldoFront(nome: string) {
    if(!this.backEndActive){
      let valor = this.valorDaPartida;
      let listaInativa: Jogador[] = this.criaListaDeJogadoresSoInativoFront();
      let listaAtiva: Jogador[] = this.criaListaDeJogadoresSoAtivoFront();

      let novaListaAtiva = listaAtiva.map((element) => {
        if(element.nome == nome) {
          element.saldo = element.saldo - (valor * (listaAtiva.length - 1))
          return element
        } else {
          element.saldo = element.saldo + valor
          return element
        }
      })

      let listaFinal = novaListaAtiva.concat(listaInativa)
      return this.jogadores = listaFinal
    } else{
      return
    }
  }

  pagamento(nome: any) {
    this.situacaoContainerPagamento = true
    this.pagador = nome

  }

  fechaContainerPagamento() {
    this.situacaoContainerPagamento = false
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deletaTudo(){

  }


}
