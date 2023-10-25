import { Component } from '@angular/core';
import { servico } from 'src/app/serviços/servico';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private servico : servico){

  }
  value: any = "2,50";

  enviaValorParaServico(){
    var valor = this.value.replace(",", ".")
    var valorDaPartida = +valor
    var numero = "NaN"

    if( numero.toString() != valorDaPartida.toString() ){
      this.servico.InformaValor(valorDaPartida)
    }
  }


  deletaTudo(){
    this.servico.deletaTudo()
  }
}
