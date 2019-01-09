import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.sass']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExercises: Exercise[] = [];
  exercises: Exercise[];
  isLoading = false;

  private exerciceSubscription: Subscription;
  private loadingSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => (this.isLoading = isLoading)
    );
    this.exerciceSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciceSubscription) {
      this.exerciceSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
