import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prediction-result',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './prediction-result.component.html',
  styleUrls: ['./prediction-result.component.scss']
})
export class PredictionResultComponent {

}
