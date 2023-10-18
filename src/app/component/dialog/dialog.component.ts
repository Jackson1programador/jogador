import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { servico } from './../../serviços/servico';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private servico: servico
    ) {}

  backEndAtivo(){
    this.servico.InformaQueTemBackEnd()
  }
}
