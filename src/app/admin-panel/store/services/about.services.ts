import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {AboutInterface, SocialInterface} from "../interfaces/about.interfaces";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AboutServices {

  readonly baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {
  }

  // Create About Information
  getCreateAboutInfo(title: string, subTitle: string, description: string, image: File): Observable<AboutInterface> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('description', description);
    formData.append('image', image);
    return this.http.post<AboutInterface>(`${this.baseUrl}/about-us/create`, formData);
  }

  // Update About Information
  getUpdateAboutInfo(title: string, subTitle: string, description: string): Observable<AboutInterface> {
    const about = {
      title: title === '' ? null : title,
      subTitle: subTitle === '' ? null : subTitle,
      description: description === '' ? null : description,
    }
    return this.http.post<AboutInterface>(`${this.baseUrl}/about-us/update`, about);
  }

  // Get about us
  getAboutUs(): Observable<AboutInterface> {
    return this.http.get<AboutInterface>(`${this.baseUrl}/about-us/find`);
  }

  // Get Social Links
  getSocialLinks(): Observable<SocialInterface> {
    return this.http.get<SocialInterface>(`${this.baseUrl}/about-us/find/social-links`);
  }

  // Delete Social Links
  deleteSocialLinks(): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/about-us/delete/social-links`);
  }

  // Delete Social Links
  deleteAboutInformation(): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/about-us/delete`);
  }

  // Create Social Links
  createSocialLinks(facebook: string, twitter: string, linkedin: string, youtube: string, instagram: string): Observable<SocialInterface> {
    const links = {
      facebook: facebook === '' ? null : facebook,
      twitter: twitter === '' ? null : twitter,
      linkedin: linkedin === '' ? null : linkedin,
      youtube: youtube === '' ? null : youtube,
      instagram: instagram === '' ? null : instagram,
    }
    return this.http.post<SocialInterface>(`${this.baseUrl}/about-us/add-social`, links);
  }

  // Update Social Links
  updateSocialLinks(facebook: string, twitter: string, linkedin: string, youtube: string, instagram: string): Observable<SocialInterface> {
    const links = {
      facebook: facebook === '' ? null : facebook,
      twitter: twitter === '' ? null : twitter,
      linkedin: linkedin === '' ? null : linkedin,
      youtube: youtube === '' ? null : youtube,
      instagram: instagram === '' ? null : instagram,
    }
    return this.http.post<SocialInterface>(`${this.baseUrl}/about-us/update/social-links`, links);
  }

}
