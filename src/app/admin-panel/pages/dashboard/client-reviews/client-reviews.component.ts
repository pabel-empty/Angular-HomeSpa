import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ClientReviewsInterface} from "../../../store/interfaces/client-reviews.interfaces";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.reducers";
import * as ClientReviewsActions from '../../../store/actions/client-reviews.actions';
import * as UserActions from '../../../store/actions/user.actions';
import {getClientReviews, getTotalReviewCount} from "../../../store/selectors/client-reviews.selectors";
import {PaginationInstance} from "ngx-pagination";
import {UserInterface} from "../../../store/interfaces/user.interfaces";
import {getUser} from "../../../store/selectors/user.selectors";
import {getClearLoadedUser} from "../../../store/actions/user.actions";

@Component({
  selector: 'app-client-reviews',
  templateUrl: './client-reviews.component.html',
  styleUrls: ['./client-reviews.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ClientReviewsComponent implements OnInit {

  //Pagination
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  reviews: ClientReviewsInterface[] = [];
  userProfilePic = {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '1px solid #aed8e9'
  };
  visible: boolean = false;
  userViewVisible: boolean = false;
  deleteReviewId!: string;
  user!: UserInterface;


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // Dispatch Actions
    this.store.dispatch(ClientReviewsActions.getClientReviews({size: this.config.itemsPerPage, page: this.config.currentPage}));

    // Subscribe store
    this.store.select(getTotalReviewCount).subscribe(count => {
      this.config.totalItems = count;
    })
    this.store.select(getClientReviews).subscribe(reviews => {
      this.visible = false;
      this.reviews = reviews;
    });
    this.store.select(getUser).subscribe(user => {
      this.user = user;
    })
  }

  updateToActive(review: ClientReviewsInterface) {
    this.store.dispatch(ClientReviewsActions.getUpdateClientReviewState({state: 'active', id: review._id}));
  }

  updateToInactive(review: ClientReviewsInterface) {
    this.store.dispatch(ClientReviewsActions.getUpdateClientReviewState({state: 'inactive', id: review._id}));
  }

  updateToDeleted(review: ClientReviewsInterface) {
    this.store.dispatch(ClientReviewsActions.getUpdateClientReviewState({state: 'deleted', id: review._id}));
  }

  permanentlyDelete() {
    this.store.dispatch(ClientReviewsActions.getDeleteClientReviewById({id: this.deleteReviewId}));
  }

  handleLiveLinkDeleteChange($event: any) {
    this.visible = $event
  }

  handleUserViewDeleteChange($event: any) {
    this.userViewVisible = $event
    this.store.dispatch(UserActions.getClearLoadedUser());
  }

  closePopupEvent() {
    this.visible = false;
  }

  openDeletePopup(_id: string) {
    this.deleteReviewId = _id;
    this.visible = true;
  }

  onPageChange(event: number) {
    this.config.currentPage = event;
    this.store.dispatch(ClientReviewsActions.getClientReviews({size: this.config.itemsPerPage, page: event}));
  }

  getUserView(userId: string) {
    this.userViewVisible = true;
    this.store.dispatch(UserActions.getUser({id: userId}));
  }

  clearPopupEvent() {
    this.userViewVisible = false;
    this.store.dispatch(UserActions.getClearLoadedUser());
  }
}
