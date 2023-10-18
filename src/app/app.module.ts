import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import {MatIconModule} from '@angular/material/icon';
import { CadastroJogadorComponent } from './component/cadastro-jogador/cadastro-jogador.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PainelComponent } from './component/painel/painel.component';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

import {MatRadioModule} from '@angular/material/radio';
import { VitoriaComponent } from './component/vitoria/vitoria.component';
import { HistoricoComponent } from './component/historico/historico.component';
import { RodapeComponent } from './component/rodape/rodape.component';
import { PagamentoComponent } from './component/pagamento/pagamento.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './component/dialog/dialog.component';







@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CadastroJogadorComponent,
    PainelComponent,
    VitoriaComponent,
    HistoricoComponent,
    RodapeComponent,
    PagamentoComponent,
    DialogComponent,






  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule




  ],
  exports:[
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    PainelComponent,
    VitoriaComponent,
    HistoricoComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
