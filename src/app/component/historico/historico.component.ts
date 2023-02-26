import { Partidas } from './../../partidas';
import { Component, OnInit } from '@angular/core';
import { servico } from './../../serviços/servico';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  partidas: Partidas[] = [];

  constructor (private servico: servico) {}

ngOnInit(): void {

  this.servico.getAllHistorico().subscribe(
    res => this.partidas = res
  )
}




}

