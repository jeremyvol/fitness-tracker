import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.sass']
})
export class NewTrainingComponent implements OnInit {
  availableExercises: Exercise[] = [];
  exercises: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    // this.availableExercises = this.trainingService.getAvailableExercises();
    this.exercises = this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            };
          });
        })
      );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
