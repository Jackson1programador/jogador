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

