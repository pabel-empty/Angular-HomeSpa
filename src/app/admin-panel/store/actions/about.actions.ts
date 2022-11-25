import {createAction, props} from "@ngrx/store";
import {AboutInterface, SocialInterface} from "../interfaces/about.interfaces";

// Create Enum Types
export enum AboutActionTypes {
  GET_DELETE_ABOUT = '[About] GET_DELETE_ABOUT',
  SET_DELETE_ABOUT = '[About] SET_DELETE_ABOUT',
  GET_DELETE_SOCIAL = '[About] GET_DELETE_SOCIAL',
  SET_DELETE_SOCIAL = '[About] SET_DELETE_SOCIAL',
  GET_CREATE_ABOUT = '[About] GET_CREATE_ABOUT',
  SET_CREATED_ABOUT = '[About] SET_CREATED_ABOUT',
  GET_ABOUT = '[About] GET_ABOUT',
  SET_ABOUT = '[About] SET_ABOUT',
  GET_SOCIAL_LINKS = '[About] GET_SOCIAL_LINKS',
  SET_SOCIAL_LINKS = '[About] SET_SOCIAL_LINKS',
  CREATE_SOCIAL_LINKS = '[About] CREATE_SOCIAL_LINKS',
  SET_CREATED_SOCIAL_LINKS = '[About] SET_CREATED_SOCIAL_LINKS',
  GET_UPDATE_SOCIAL_LINKS = '[About] GET_UPDATE_SOCIAL_LINKS',
  SET_UPDATE_SOCIAL_LINKS = '[About] SET_UPDATE_SOCIAL_LINKS',
  GET_UPDATE_ABOUT = '[About] GET_UPDATE_ABOUT',
  SET_UPDATE_ABOUT = '[About] SET_UPDATE_ABOUT',
}



export const deleteAboutInformation = createAction(
  AboutActionTypes.GET_DELETE_ABOUT
);
export const setDeleteConfirmAboutInfo = createAction(
  AboutActionTypes.SET_DELETE_ABOUT,
  props<{confirm: boolean}>()
);

export const getUpdateSocialLinks = createAction(
  AboutActionTypes.GET_UPDATE_SOCIAL_LINKS,
  props<{facebook: string; twitter: string; linkedin: string; youtube: string; instagram: string;}>()
);
export const setUpdatedSocialLinks = createAction(
  AboutActionTypes.SET_UPDATE_SOCIAL_LINKS,
  props<{links: SocialInterface;}>()
);

export const createSocialLinks = createAction(
  AboutActionTypes.CREATE_SOCIAL_LINKS,
  props<{facebook: string; twitter: string; linkedin: string; youtube: string; instagram: string;}>()
);
export const setCreatedSocialLinks = createAction(
  AboutActionTypes.SET_CREATED_SOCIAL_LINKS,
  props<{links: SocialInterface;}>()
);

export const deleteSocialLinks = createAction(
  AboutActionTypes.GET_DELETE_SOCIAL
);
export const setDeleteConfirmSocial = createAction(
  AboutActionTypes.SET_DELETE_SOCIAL,
  props<{confirm: boolean}>()
);

export const getSocialLinks = createAction(
  AboutActionTypes.GET_SOCIAL_LINKS,
);

export const setSocialLinks = createAction(
  AboutActionTypes.SET_SOCIAL_LINKS,
  props<{links: SocialInterface}>()
)

export const getAbout = createAction(
  AboutActionTypes.GET_ABOUT,
);

export const setAbout = createAction(
  AboutActionTypes.SET_ABOUT,
  props<{about: AboutInterface}>()
);

export const createAbout = createAction(
  AboutActionTypes.GET_CREATE_ABOUT,
  props<{title: string; subTitle: string; description: string; image: File}>()
);

export const setCreatedAbout = createAction(
  AboutActionTypes.SET_CREATED_ABOUT,
  props<{about: AboutInterface}>()
);

export const getUpdateAbout = createAction(
  AboutActionTypes.GET_UPDATE_ABOUT,
  props<{title: string; subTitle: string; description: string}>()
);

export const setUpdatedAbout = createAction(
  AboutActionTypes.SET_UPDATE_ABOUT,
  props<{about: AboutInterface}>()
);

