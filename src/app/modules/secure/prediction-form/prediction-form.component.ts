import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prediction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './prediction-form.component.html',
  styleUrls: ['./prediction-form.component.scss']
})
export class PredictionFormComponent {
  form!: FormGroup;

  predictionResult: any;

  seasons = [
    { id: 'btnSummer', label: 'Summer', value: 'Summer', icon: 'assets/images/season/summer.svg' },
    { id: 'btnRainy', label: 'Rainy', value: 'Rainy', icon: 'assets/images/season/rainy.svg' },
    { id: 'btnWinter', label: 'Winter', value: 'Winter', icon: 'assets/images/season/winter.svg' },
  ];

  climates = [
    { id: 'btnHotDry', label: 'Hot-Dry', value: 'Hot-Dry', icon: 'assets/images/climate-type/hot-dry.svg' },
    { id: 'btnHumid', label: 'Humid', value: 'Humid', icon: 'assets/images/climate-type/humid.svg' },
    { id: 'btnColdWet', label: 'Cold-Wet', value: 'Cold-Wet', icon: 'assets/images/climate-type/cold-wet.svg' },
  ];

  stages = [
    { id: 'btnCalf', label: 'Calf', value: 'calf', icon: 'assets/images/animal-stage/calf.svg' },
    { id: 'btnHeifer', label: 'Heifer', value: 'heifer', icon: 'assets/images/animal-stage/heifer.svg' },
    { id: 'btnLactating', label: 'Lactating', value: 'lactating', icon: 'assets/images/animal-stage/lactating.svg' },
    { id: 'btnPregnant', label: 'Pregnant', value: 'pregnant', icon: 'assets/images/animal-stage/pregnant.svg' },
    { id: 'btnAdult', label: 'Adult', value: 'adult', icon: 'assets/images/animal-stage/adult.svg' },
  ];

  behaviors = [
    { id: 'btnNormal', label: 'Normal', value: 'normal', icon: 'assets/images/behavior/normal.svg' },
    { id: 'btnAggressive', label: 'Aggressive', value: 'aggressive', icon: 'assets/images/behavior/aggressive.svg' },
    { id: 'btnIsolated', label: 'Isolated', value: 'isolated', icon: 'assets/images/behavior/isolated.svg' },
    { id: 'btnLethargic', label: 'Lethargic', value: 'lethargic', icon: 'assets/images/behavior/lethargic.svg' },
    { id: 'btnRestless', label: 'Restless', value: 'restless', icon: 'assets/images/behavior/restless.svg' },
  ];

  symptoms = [
    { id: 'btnNasalDischarge', label: 'Nasal discharge', value: 'Nasal Discharge', icon: 'assets/images/visible-symptoms/nasal-discharge.svg' },
    { id: 'btnDiarrhea', label: 'Diarrhea', value: 'diarrhea', icon: 'assets/images/visible-symptoms/diarrhea.svg' },
    { id: 'btnLimping', label: 'Limping', value: 'limping', icon: 'assets/images/visible-symptoms/limping.svg' },
    { id: 'btnSwallonUdder', label: 'Swollen udder', value: 'swollen udder', icon: 'assets/images/visible-symptoms/swallon-udder.svg' },
    { id: 'btnCoughing', label: 'Coughing', value: 'coughing', icon: 'assets/images/visible-symptoms/coughing.svg' },
  ];

  vaccinations = [
    { id: 'btnuptodate', label: 'Upto date', value: 'up-to-date', icon: 'assets/images/vacc-status/upto-date.svg' },
    { id: 'btnpartial', label: 'Partial', value: 'partial', icon: 'assets/images/vacc-status/partial.svg' },
    { id: 'btnnotdone', label: 'Not done', value: 'not done', icon: 'assets/images/vacc-status/not-done.svg' },
  ];

  constructor(private fb: FormBuilder, private toastr: ToastrService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      season: [''],
      climateType: [''],
      animalStage: [''],
      behavior: [''],
      vaccinationStatus: [''],
      symptoms: this.fb.array([]),
    });
  }

  // Add/remove symptoms dynamically
  toggleSymptom(symptom: string): void {
    const symptomsArray = this.form.get('symptoms') as FormArray;
    const index = symptomsArray.value.indexOf(symptom);

    if (index === -1) {
      symptomsArray.push(this.fb.control(symptom));
    } else {
      symptomsArray.removeAt(index);
    }
  }

  // Used in HTML to check if a symptom is selected
  isSymptomSelected(symptom: string): boolean {
    const symptomsArray = this.form.get('symptoms') as FormArray;
    return symptomsArray.value.includes(symptom);
  }

  submit(): void {
    console.log(this.form.value);
    let formData = this.form.value;

    if (!this.form.valid) {
      this.toastr.error('Please select all required fields and symptoms');
      return;
    }


    const encFromData = JSON.stringify(formData);

    this.router.navigate(['/prediction-result'], {
      queryParams: { data: encFromData }
    });

    // this.authService.predict(formData).subscribe({
    //   next: (response: any) => {
    //     if (response.statusCode == '200') {

    //       let parsedResult;

    //       try {
    //         // Parse the JSON string from responseData if it's a string
    //         parsedResult = typeof response.responseData === 'string'
    //           ? JSON.parse(response.responseData)
    //           : response.responseData;
    //       } catch (err) {
    //         console.error("Error parsing JSON from responseData", err);
    //         this.toastr.error("Invalid prediction data received");
    //         return;
    //       }


    //       // Store pretty JSON in localStorage
    //       //localStorage.setItem('jsonResult', beautifiedJson);

    //       this.toastr.success(response.statusMessage);
    //       this.router.navigate(['/prediction-result'], { replaceUrl: true });
    //       this.predictionResult = JSON.stringify(parsedResult);
    //     } else {
    //       this.toastr.error(response.message || 'Login failed');
    //     }
    //   },
    //   error: (error) => {
    //     this.toastr.error(error.message || 'Login failed. Please try again.');
    //   }
    // });
  }
}
