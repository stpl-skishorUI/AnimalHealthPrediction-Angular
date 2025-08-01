import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

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
    { id: 'btnCalf', label: 'Calf', value: 'Calf', icon: 'assets/images/animal-stage/calf.svg' },
    { id: 'btnHeifer', label: 'Heifer', value: 'Heifer', icon: 'assets/images/animal-stage/heifer.svg' },
    { id: 'btnLactating', label: 'Lactating', value: 'Lactating', icon: 'assets/images/animal-stage/lactating.svg' },
    { id: 'btnPregnant', label: 'Pregnant', value: 'Pregnant', icon: 'assets/images/animal-stage/pregnant.svg' },
    { id: 'btnAdult', label: 'Adult', value: 'Adult', icon: 'assets/images/animal-stage/adult.svg' },
  ];

  behaviors = [
    { id: 'btnNormal', label: 'Normal', value: 'Normal', icon: 'assets/images/behavior/normal.svg' },
    { id: 'btnAggressive', label: 'Aggressive', value: 'Aggressive', icon: 'assets/images/behavior/aggressive.svg' },
    { id: 'btnIsolated', label: 'Isolated', value: 'Isolated', icon: 'assets/images/behavior/isolated.svg' },
    { id: 'btnLethargic', label: 'Lethargic', value: 'Lethargic', icon: 'assets/images/behavior/lethargic.svg' },
    { id: 'btnRestless', label: 'Restless', value: 'Restless', icon: 'assets/images/behavior/restless.svg' },
  ];

  symptoms = [
    { id: 'btnNasalDischarge', label: 'Nasal Discharge', value: 'Nasal Discharge', icon: 'assets/images/visible-symptoms/nasal-discharge.svg' },
    { id: 'btnDiarrhea', label: 'Diarrhea', value: 'Diarrhea', icon: 'assets/images/visible-symptoms/diarrhea.svg' },
    { id: 'btnLimping', label: 'Limping', value: 'Limping', icon: 'assets/images/visible-symptoms/limping.svg' },
    { id: 'btnSwallonUdder', label: 'Swallon Udder', value: 'Swallon Udder', icon: 'assets/images/visible-symptoms/swallon-udder.svg' },
    { id: 'btnCoughing', label: 'Coughing', value: 'Coughing', icon: 'assets/images/visible-symptoms/coughing.svg' },
  ];

  vaccinations = [
    { id: 'btnuptodate', label: 'Upto date', value: 'up-to-date', icon: 'assets/images/vacc-status/upto-date.svg' },
    { id: 'btnpartial', label: 'Partial', value: 'partial', icon: 'assets/images/vacc-status/partial.svg' },
    { id: 'btnnotdone', label: 'Not done', value: 'not done', icon: 'assets/images/vacc-status/not-done.svg' },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      season: [''],
      climate: [''],
      stage: [''],
      behavior: [''],
      vaccStatus: [''],
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

  submit() {
    console.log(this.form.value);
  }
}
