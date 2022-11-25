import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {AboutInterface, SocialInterface} from "../interfaces/about.interfaces";
import {createReducer, on} from "@ngrx/store";
import {
  setAbout,
  setCreatedAbout,
  setCreatedSocialLinks, setDeleteConfirmAboutInfo,
  setDeleteConfirmSocial,
  setSocialLinks, setUpdatedAbout, setUpdatedSocialLinks
} from "../actions/about.actions";

// About State
export interface AboutState extends EntityState<AboutInterface> {
  errors: any,
  socialLinks: any,
}
// About Create Adapter
export const aboutAdapter = createEntityAdapter<AboutInterface>({
  selectId: (entity: AboutInterface) => entity._id
});
// Initial About State
export const aboutInitialState: AboutState = aboutAdapter.getInitialState({
  errors: null,
  socialLinks: null,
});
// About Reducers
export const aboutReducers = createReducer(
  aboutInitialState,

  on(setCreatedAbout, (state, action) => {
    return aboutAdapter.setOne(action.about, state);
  }),

  on(setUpdatedAbout, (state, action) => {
    return aboutAdapter.setOne(action.about, state);
  }),

  on(setAbout, (state, action) => {
    return aboutAdapter.setOne(action.about, state);
  }),

  on(setSocialLinks, (state, action) => {
    return {
      ...state,
      socialLinks: action.links
    }
  }),

  on(setCreatedSocialLinks, (state, action) => {
    return {
      ...state,
      socialLinks: action.links
    }
  }),

  on(setUpdatedSocialLinks, (state, action) => {
    return {
      ...state,
      socialLinks: action.links
    }
  }),

  on(setDeleteConfirmSocial, (state, action) => {
    return {
      ...state,
      socialLinks: null
    }
  }),

  on(setDeleteConfirmAboutInfo, (state, action) => {
    return aboutAdapter.removeOne(1, state)
  })

)

export const {selectAll} = aboutAdapter.getSelectors();
