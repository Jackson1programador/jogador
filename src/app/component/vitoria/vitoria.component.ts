import { Component } from '@angular/core';

@Component({
  selector: 'app-vitoria',
  templateUrl: './vitoria.component.html',
  styleUrls: ['./vitoria.component.scss']
})
export class VitoriaComponent {
  favoriteSeason!: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
