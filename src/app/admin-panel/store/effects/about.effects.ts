import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AboutServices} from "../services/about.services";
import * as AboutActions from '../actions/about.actions';
import {concatMap, map} from "rxjs/operators";
import {createSocialLinks, getUpdateSocialLinks, setCreatedSocialLinks} from "../actions/about.actions";


@Injectable({
  providedIn: 'root'
})
export class AboutEffects {

  // create about information
  createAbout$ = createEffect(
    () => this.actions$.pipe(
      ofType(AboutActions.createAbout),
      concatMap(({title, subTitle, image, description}) => {
        return this.aboutServices.getCreateAboutInfo(title, subTitle, description, image).pipe(
          map(about => {
            return AboutActions.setCreatedAbout({about});
          })
        )
      })
    )
  )

  // update about information
  updateAboutInformation$ = createEffect(
    () => this.actions$.pipe(
      ofType(AboutActions.getUpdateAbout),
      concatMap(({title, subTitle, description}) => {
        return this.aboutServices.getUpdateAboutInfo(title, subTitle, description).pipe(
          map(about => {
            return AboutActions.setUpdatedAbout({about});
          })
        )
      })
    )
  )

  // Get about us
  getAboutUs$ = createEffect(
    () => this.actions$.pipe(
      ofType(AboutActions.getAbout),
      concatMap(() => {
        return this.aboutServices.getAboutUs().pipe(
          map(about => {
            return AboutActions.setAbout({about});
          })
        )
      })
    )
  );

  // Get social links
  getSocialLinks$ = createEffect(
    () => this.actions$.pipe(
      ofType(AboutActions.getSocialLinks),
      concatMap(() => {
        return this.aboutServices.getSocialLinks().pipe(
          map(links => {
            return AboutActions.setSocialLinks({links});
          })
        )
      })
    )
  );


  // Get Delete Social Links
  getDeleteSocialLinks$ = createEffect(
    () => this.actions$.pipe(
      ofType(AboutActions.deleteSocialLinks),
      concatMap(() => {
        return this.aboutServices.deleteSocialLinks().pipe(
          map(confirm => {
            return AboutActions.setDeleteConfirmSocial({confirm});
          })
        )
      })
    )
  );


  // Get Delete About Information
  getDeleteAboutInfo$ = createEffect(
    () => this.actions$.pipe(
      ofType(AboutActions.deleteAboutInformation),
      concatMap(() => {
        return this.aboutServices.deleteAboutInformation().pipe(
          map(confirm => {
            return AboutActions.setDeleteConfirmAboutInfo({confirm});
          })
        )
      })
    )
  );

  // Create Social Links
  createSocialLinks$ = createEffect(
    () => this.actions$.pipe(
      ofType(createSocialLinks),
      concatMap(({instagram,facebook,youtube,twitter,linkedin}) => {
        return this.aboutServices.createSocialLinks(facebook,twitter,linkedin,youtube,instagram).pipe(
          map((links) => setCreatedSocialLinks({links}))
        )
      })
    )
  );

  // Update Social Links
  updateSocialLinks$ = createEffect(
    () => this.actions$.pipe(
      ofType(getUpdateSocialLinks),
      concatMap(({instagram,facebook,youtube,twitter,linkedin}) => {
        return this.aboutServices.updateSocialLinks(facebook,twitter,linkedin,youtube,instagram).pipe(
          map((links) => setCreatedSocialLinks({links}))
        )
      })
    )
  )


  constructor(private actions$: Actions, private aboutServices: AboutServices) {
  }
}

