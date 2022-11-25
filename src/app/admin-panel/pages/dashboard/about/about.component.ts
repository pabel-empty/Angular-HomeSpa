import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.reducers";
import * as AboutActions from '../../../store/actions/about.actions';
import {getAbout, getSocialLinks} from "../../../store/selectors/about.selectors";
import {AboutInterface, SocialInterface} from "../../../store/interfaces/about.interfaces";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public updateVisibleOfAbout: boolean = false;
  public updateVisible: boolean = false;
  public visible: boolean = false;
  public createNewAbout: boolean = false;
  public imageFile: File | null = null;
  public fileRequired: boolean = false;
  public about: AboutInterface[] = [];
  public socialLinks!: SocialInterface;
  public loadingSpinnerOfLinks: boolean = false
  public loadingSpinnerOfAbout: boolean = false
  // About Information
  public aboutInfoFormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.minLength(3),
      Validators.required
    ]),
    subtitle: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    description: new FormControl('', [
      Validators.required
    ])
  });
  // Social Links Form Group
  public socialLinksFormGroup = new FormGroup({
    facebook: new FormControl('',
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
    ),
    twitter: new FormControl('',
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
    ),
    linkedin: new FormControl('',
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
    ),
    youtube: new FormControl('',
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
    ),
    instagram: new FormControl('',
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
    )
  });
  get facebookVal() { return this.socialLinksFormGroup.get('facebook'); }
  get twitterVal() { return this.socialLinksFormGroup.get('twitter'); }
  get linkedinVal() { return this.socialLinksFormGroup.get('linkedin'); }
  get youtubeVal() { return this.socialLinksFormGroup.get('youtube'); }
  get instagramVal() { return this.socialLinksFormGroup.get('instagram'); }

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(getAbout).subscribe(about => {
      this.updateVisibleOfAbout = false;
      this.about = about;
      this.loadingSpinnerOfAbout = false;
      this.aboutInfoFormGroup.reset()
    });
    this.store.select(getSocialLinks).subscribe(links => {
      this.visible = false;
      this.updateVisible = false;
      this.loadingSpinnerOfLinks = false;
      this.socialLinksFormGroup.reset();
      this.socialLinks = links;
    })
  }


  // visible changes of about
  visibleChangeOfAbout(event: any){
    this.updateVisibleOfAbout = event;
  }
  // visible state change
  visibleUpdateChangeOfAbout(){
    this.updateVisibleOfAbout = true;
    this.aboutInfoFormGroup = new FormGroup({
      title: new FormControl(this.about[0].title, [
        Validators.minLength(3),
        Validators.required
      ]),
      subtitle: new FormControl(this.about[0].subTitle, [
        Validators.minLength(3),
        Validators.required
      ]),
      description: new FormControl(this.about[0].description, [
        Validators.required
      ])
    });
  }


  // Close Social Links Delete Popup Box
  closeSocialLinkDeletePopup() {
    this.visible = false;
  }

  // tslint:disable-next-line:typedef
  handleFileInput(event: any) {
    this.fileRequired = false;
    this.imageFile = event.target.files[0] as File;
  }

  // Submit About Information
  submitAboutInformation(){
    if(this.aboutInfoFormGroup.invalid || this.imageFile === null){
      this.fileRequired = true;
      return;
    }
    this.loadingSpinnerOfAbout = true;
    this.store.dispatch(AboutActions.createAbout({
      image: this.imageFile!,
      title: this.aboutInfoFormGroup.value.title!,
      subTitle: this.aboutInfoFormGroup.value.subtitle!,
      description: this.aboutInfoFormGroup.value.description!
    }));
  }
  // Update About Information
  updateAbout(){
    this.loadingSpinnerOfAbout = true;
    this.store.dispatch(AboutActions.getUpdateAbout({
      title: this.aboutInfoFormGroup.value.title!,
      subTitle: this.aboutInfoFormGroup.value.subtitle!,
      description: this.aboutInfoFormGroup.value.description!
    }));
  }


  // Delete About Information
  deleteAboutInformation() {
    this.store.dispatch(AboutActions.deleteAboutInformation());
  }

  // Clear About Information
  clearAboutInformation(){
    this.aboutInfoFormGroup.reset();
  }

  // Clear About Information
  clearSocialLinks(){
    this.socialLinksFormGroup.reset();
  }


  // Delete Popup Process
  deleteSocialLinks(){
    this.store.dispatch(AboutActions.deleteSocialLinks());
  }
  visibleDeletePopup() {
    this.visible = true;
  }
  handleLiveLinkDeleteChange(event: any) {
    this.visible = event;
  }

  // Update Popup Process
  clearVisibleUpdatePopup() {
    this.updateVisibleOfAbout = false;
    this.updateVisible = false;
  }
  visibleChange(event: any) {
    this.updateVisible = event;
  }


  saveSocialLinks() {
    this.loadingSpinnerOfLinks = true;
    this.store.dispatch(AboutActions.createSocialLinks({
      youtube: this.socialLinksFormGroup.value.youtube!,
      instagram: this.socialLinksFormGroup.value.instagram!,
      linkedin: this.socialLinksFormGroup.value.linkedin!,
      facebook: this.socialLinksFormGroup.value.facebook!,
      twitter: this.socialLinksFormGroup.value.twitter!,
    }));
  }

  updateSocialLinks() {
    this.loadingSpinnerOfLinks = true;
    this.store.dispatch(AboutActions.getUpdateSocialLinks({
      youtube: this.socialLinksFormGroup.value.youtube!,
      instagram: this.socialLinksFormGroup.value.instagram!,
      linkedin: this.socialLinksFormGroup.value.linkedin!,
      facebook: this.socialLinksFormGroup.value.facebook!,
      twitter: this.socialLinksFormGroup.value.twitter!,
    }));
  }


  getValues(){
    this.updateVisible = true;
    this.socialLinksFormGroup = new FormGroup({
      facebook: new FormControl(this.socialLinks.facebook,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ),
      twitter: new FormControl(this.socialLinks.twitter,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ),
      linkedin: new FormControl(this.socialLinks.linkedin,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ),
      youtube: new FormControl(this.socialLinks.youtube,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ),
      instagram: new FormControl(this.socialLinks.instagram,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      )
    });
  }


}
