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
  @Output() public avisarQueHouveUmaExclusao = new EventEmitter();
  @Output() public avisarQueHouveAMesmaExclusao = new EventEmitter();
  controladorDePartidaFront: number = 1;

  constructor (private servico: servico) {}

ngOnInit(): void {

  this.servico.getAllHistorico().subscribe(
    res => {
      this.partidas = res
    })

  this.servico.vencedorEmitEvent.subscribe(
    res => {
      alert(`Vencedor é ${res.vencedor}`)
      return this.partidas.push(res);
    }
  )

  this.servico.vencedorEmitEventFront.subscribe(
    res => {
      alert(`Vencedor é ${res.vencedor}`)

      var partidaAtual = {vencedor: "nome", id: 0, partida: 0 };
      partidaAtual.vencedor = res.vencedor
      partidaAtual.partida = res.partida
      partidaAtual.id = this.controladorDePartidaFront

      this.controladorDePartidaFront += 1
      console.log(partidaAtual)
      console.log(res)
      this.partidas.push(partidaAtual)
      return partidaAtual;


    }
  )

}

public excluiVencedor(index: number) {



  this.servico.excluiVencedorBackEnd(index).subscribe(
    res => {
    this.avisarQueHouveUmaExclusao.emit();
    this.avisarQueHouveAMesmaExclusao.emit(this.partidas[index-1].vencedor);
    this.partidas = this.partidas.filter(
      item=> { return index !== item.id}

    )
    })
}





}

