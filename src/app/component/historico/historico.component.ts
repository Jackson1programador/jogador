import { Partidas } from './../../partidas';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { servico } from './../../serviços/servico';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  partidas: Partidas[] = [];
  controladorDePartidaFront: number = 1;
  backEndActive:Boolean = false;
  @Output() public avisarQueHouveUmaExclusao = new EventEmitter();
  @Output() public avisarQueHouveAMesmaExclusao = new EventEmitter();
  @Output() public avisarQueHouveUmaExclusaoFront = new EventEmitter();
  @Output() public avisarQueHouveAMesmaExclusaoFront = new EventEmitter();

  constructor (private servico: servico) {}

  ngOnInit(): void {
    this.backEndActive = this.servico.backEndActive
    this.servico.avisaQueOBackSubiu.subscribe(
      res => {this.backEndActive = res;
    })

    if(this.backEndActive){
      this.servico.getAllHistorico().subscribe(
        res => {
          this.partidas = res
        })
    }

    if(this.backEndActive){
      this.servico.vencedorEmitEvent.subscribe(
        res => {
          alert(`Vencedor é ${res.vencedor}`)
          return this.partidas.push(res);
        }
      )
    }

    if(!this.backEndActive){
      this.servico.vencedorEmitEventFront.subscribe(
        res => {
          alert(`Vencedor é ${res.vencedor}`)

          var partidaAtual = {vencedor: "nome", id: 0, partida: 0 };
          partidaAtual.vencedor = res.vencedor
          partidaAtual.partida = res.partida
          partidaAtual.id = this.controladorDePartidaFront

          this.controladorDePartidaFront += 1
          this.partidas.push(partidaAtual)
          return partidaAtual;
        }
      )
    }
  }

  public excluiVencedor(index: number) {
    if(this.backEndActive){
      this.servico.excluiVencedorBackEnd(index).subscribe(
        res => {
        this.avisarQueHouveUmaExclusao.emit();
        this.avisarQueHouveAMesmaExclusao.emit(this.partidas[index-1].vencedor);
        this.partidas = this.partidas.filter(
          item=> { return index !== item.id})
        })
    }
  }

  public excluiVencedorFront(id: number) {
    if(!this.backEndActive){
      this.controladorDePartidaFront -=1
      this.avisarQueHouveAMesmaExclusaoFront.emit(this.partidas[id-1].vencedor);
      this.partidas = this.partidas.filter(
          item=> { return id !== item.id} )
      this.avisarQueHouveUmaExclusaoFront.emit();
    }
  }


}

