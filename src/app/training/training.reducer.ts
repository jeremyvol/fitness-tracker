// import { Action } from '@ngrx/store';
import {
  TrainingActions,
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING
} from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initalState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state = initalState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: action.payload
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: action.payload
      };
    default:
      return state;
  }
}

// export const getIsAuth = (state: State) => state.isAuthenticated;
export const getAvailableExercises = (state: TrainingState) =>
  state.availableExercises;
export const getFinishedExercises = (state: TrainingState) =>
  state.finishedExercises;
export const getActiveTraining = (state: TrainingState) => state.activeTraining;
