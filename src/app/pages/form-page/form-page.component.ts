import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StepModel } from '../../models/step.model';
import { Subscription } from 'rxjs';
import { StepsService } from '../../services/steps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormPageComponent implements OnInit {
  currentStep: StepModel;
  currentStepSub: Subscription;

  constructor(
    private stepsService: StepsService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentStepSub = this.stepsService.getCurrentStep().subscribe((step: StepModel) => {
      this.currentStep = step;
    });
  }

  onNextStep() {
    if (!this.stepsService.isLastStep()) {
      this.stepsService.moveToNextStep();
    } else {
      this.onSubmit();
    }
  }

  showButtonLabel() {
    return !this.stepsService.isLastStep() ? 'Continue' : 'Finish';
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks and unexpected angular errors
    this.currentStepSub.unsubscribe();
  }

  onSubmit(): void {
    this.router.navigate(['/complete']);
  }
}
