import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

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

  predictionData: any;
  predictionResult: any;

  constructor(private activateRoute: ActivatedRoute, private toastr: ToastrService, private authService: AuthService) {
    this.activateRoute.queryParams.subscribe((res: any) => {
      this.predictionData = JSON.parse(decodeURIComponent(res.data))
      console.log('Prediction Data:', this.predictionData);
    }
    );
  }

  ngOnInit(): void {
    this.predictionData ? this.predict() : '';
  }

  predict(): void {
    this.authService.predict(this.predictionData).subscribe({
      next: (response: any) => {
        if (response.statusCode == '200') {

          let parsedResult;

          try {
            // Parse the JSON string from responseData if it's a string
            parsedResult = typeof response.responseData === 'string'
              ? JSON.parse(response.responseData)
              : response.responseData;
          } catch (err) {
            console.error("Error parsing JSON from responseData", err);
            this.toastr.error("Invalid prediction data received");
            return;
          }
          this.toastr.success(response.statusMessage);
          this.predictionResult = parsedResult;
          console.log('Prediction Result:', this.predictionResult);
        } else {
          this.toastr.error(response.message || 'Prediction failed');
        }
      },
      error: (error) => {
        this.toastr.error(error.message || 'Prediction failed. Please try again.');
      }
    });
  }

  toggleAccordion(index: number) {
    if (this.predictionResult?.jsonResult?.MonitoringRecommendations) {
      this.predictionResult.jsonResult.MonitoringRecommendations.forEach((item: any, i: number) => {
        item.expanded = i === index ? !item.expanded : false;
      });
    }
  }

}
