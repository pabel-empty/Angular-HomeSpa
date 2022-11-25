import {createAction, props} from "@ngrx/store";
import {ServicesInterface} from "../interfaces/services.interfaces";

export enum ServicesActionTypes {
  GET_SERVICES = '[Service] GET_SERVICES',
  SET_SERVICES = '[Service] SET_SERVICES',
  GET_SERVICES_BY_CATEGORY_NAME = '[Service] GET_SERVICES_BY_CATEGORY_NAME',
  SET_SERVICES_BY_CATEGORY_NAME = '[Service] SET_SERVICES_BY_CATEGORY_NAME',
  GET_SEARCH_SERVICES = '[Service] GET_SEARCH_SERVICES',
  SET_SEARCH_SERVICES = '[Service] SET_SEARCH_SERVICES',
  GET_UPDATE_SERVICE_STATE = '[Service] GET_UPDATE_SERVICE_STATE',
  SET_UPDATE_SERVICE_STATE = '[Service] SET_UPDATE_SERVICE_STATE',
  GET_DELETE_SERVICE = '[Service] GET_DELETE_SERVICE',
  SET_DELETE_SERVICE = '[Service] SET_DELETE_SERVICE',
  ADD_NEW_SERVICE = '[Service] ADD_NEW_SERVICE',
  SET_NEW_SERVICE = '[Service] SET_NEW_SERVICE',
  GET_TOTAL_COUNT = '[Service] GET_TOTAL_COUNT',
  SET_TOTAL_COUNT = '[Service] SET_TOTAL_COUNT',
  GET_UPDATE_SERVICE = '[Service] GET_UPDATE_SERVICE',
  SET_UPDATE_SERVICE = '[Service] SET_UPDATE_SERVICE',
}


export const getTotalCount = createAction(
  ServicesActionTypes.GET_TOTAL_COUNT
)
export const setTotalCount = createAction(
  ServicesActionTypes.SET_TOTAL_COUNT,
  props<{count: number}>()
)

export const addNewService = createAction(
  ServicesActionTypes.ADD_NEW_SERVICE,
  props<{title: string; category: string; description: string; state: string; image: File}>()
)
export const setNewService = createAction(
  ServicesActionTypes.SET_NEW_SERVICE,
  props<{service: ServicesInterface}>()
)

export const getUpdateServiceById = createAction(
  ServicesActionTypes.GET_UPDATE_SERVICE,
  props<{_id: string; title: string; category: string; description: string; state: string; image: File}>()
)
export const setUpdateServiceById = createAction(
  ServicesActionTypes.SET_UPDATE_SERVICE,
  props<{service: ServicesInterface}>()
)

export const getDeleteService = createAction(
  ServicesActionTypes.GET_DELETE_SERVICE,
  props<{id: string}>()
)
export const setDeleteService = createAction(
  ServicesActionTypes.SET_DELETE_SERVICE,
  props<{message: string, id: string}>()
)

export const getUpdateServiceStateById = createAction(
  ServicesActionTypes.GET_UPDATE_SERVICE_STATE,
  props<{id: string; state: string}>()
)
export const setUpdateServiceStateById = createAction(
  ServicesActionTypes.SET_UPDATE_SERVICE_STATE,
  props<{service: ServicesInterface}>()
)


export const getServices = createAction(
  ServicesActionTypes.GET_SERVICES,
  props<{page: number; size: number}>()
)
export const setServices = createAction(
  ServicesActionTypes.SET_SERVICES,
  props<{services: ServicesInterface[]}>()
)

export const getServicesByCategoryName = createAction(
  ServicesActionTypes.GET_SERVICES_BY_CATEGORY_NAME,
  props<{page: number; size: number, categoryName: string}>()
)
export const setServicesByCategoryName = createAction(
  ServicesActionTypes.SET_SERVICES_BY_CATEGORY_NAME,
  props<{services: ServicesInterface[]}>()
)


export const getSearchedServices = createAction(
  ServicesActionTypes.GET_SEARCH_SERVICES,
  props<{keyword: string; page: number; size: number;}>()
)
export const setSearchedServices = createAction(
  ServicesActionTypes.SET_SEARCH_SERVICES,
  props<{services: ServicesInterface[], count: number}>()
)
