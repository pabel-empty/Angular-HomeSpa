import { createAction, props } from '@ngrx/store';


export enum HomeActionsTypes {
  getServices = '[Home] Get Services',
  setServices = '[Home] Get Services Success',
}

export const getServices = createAction(
  HomeActionsTypes.getServices,
  props<{ page: number; size: number; }>()
);

export const setServices = createAction(
  HomeActionsTypes.setServices,
  props<{ services: any[]; }>()
);

