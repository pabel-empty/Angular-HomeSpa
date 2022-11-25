import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServicesInterface} from "../../../store/interfaces/services.interfaces";
import {PaginationInstance} from "ngx-pagination";
import {AppState} from "../../../../app.reducers";
import {Store} from "@ngrx/store";
import * as ServicesActions from '../../../store/actions/services.actions';
import {getServices, getTotalServiceCount} from "../../../store/selectors/services.selectors";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, fromEvent} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ServicesComponent implements OnInit, AfterViewInit {
  updatableServiceId!: string;
  service!: ServicesInterface;
  visible: boolean = false;
  serviceEditPopupVisible: boolean = false;
  addNewVisible: boolean = false;
  refreshLoadingSpinner: boolean = false;
  services: ServicesInterface[] = [];
  deleteServiceId!: string;
  imageFile: File | null = null;
  fileRequired: boolean = false;
  loadingSpinnerService: boolean = false;
  singleServiceViewVisible: boolean = false;
  isEditable: boolean = false;
  searchLoadingSpinner: boolean = true;
  //Pagination
  config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };
  userProfilePic = {
    height: '90px',
    width: '150px',
    borderRadius: '5px',
    overflow: 'hidden',
    border: '1px solid #aed8e9'
  };
  serviceForm = new FormGroup({
    title: new FormControl('', [
      Validators.minLength(3),
      Validators.required
    ]),
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    description: new FormControl('', [
      Validators.required
    ])
  });
  @ViewChild('fileType') fileType!: ElementRef;
  @ViewChild('fileType2') fileType2!: ElementRef;
  @ViewChild('searchService') searchService!: ElementRef;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(ServicesActions.getServices({
      page: this.config.currentPage, size: this.config.itemsPerPage
    }));

    this.store.select(getServices).subscribe(services => {
      this.serviceEditPopupVisible = false;
      this.addNewVisible = false;
      this.refreshLoadingSpinner = false;
      this.loadingSpinnerService = false;
      this.visible = false;
      this.clearNewServiceForm();
      this.services = services
    });
    this.store.select(getTotalServiceCount).subscribe(count => {
      this.config.totalItems = count;
    })
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.searchService.nativeElement,'keyup')
      .pipe(
        filter(Boolean),
        tap((text) => {
          this.searchLoadingSpinner = true
        }),
        debounceTime(150),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        let key = this.searchService.nativeElement.value;
        if(key.length !== 0){
          this.store.dispatch(ServicesActions.getSearchedServices({
            keyword: key, page: this.config.currentPage, size: this.config.itemsPerPage
          }));
        }else{
          this.store.dispatch(ServicesActions.getTotalCount());
          this.store.dispatch(ServicesActions.getServices({
            page: this.config.currentPage, size: this.config.itemsPerPage
          }));
        }
      });
  }


  onPageChange(event: number) {
    this.store.dispatch(ServicesActions.getServices({
      page: event, size: this.config.itemsPerPage
    }));
  }

  updateToDeleted(service: ServicesInterface) {
    this.store.dispatch(ServicesActions.getUpdateServiceStateById({id: service._id, state: 'DELETED'}));
  }

  updateToActive(service: ServicesInterface) {
    this.store.dispatch(ServicesActions.getUpdateServiceStateById({id: service._id, state: 'ACTIVE'}));
  }

  updateToInactive(service: ServicesInterface) {
    this.store.dispatch(ServicesActions.getUpdateServiceStateById({id: service._id, state: 'INACTIVE'}));
  }

  openDeletePopup(_id: string) {
    this.deleteServiceId = _id;
    this.visible = true;
  }

  showService(service: ServicesInterface) {
    this.service = service;
    this.singleServiceViewVisible = true
  }

  closePopupEvent() {
    this.visible = false;
  }

  handleLiveLinkDeleteChange(event: boolean) {
    this.visible = event;
  }

  permanentlyDelete() {
    this.store.dispatch(ServicesActions.getDeleteService({id: this.deleteServiceId}));
  }

  clickToRefreshLoadedService() {
    this.refreshLoadingSpinner = true;
    this.store.dispatch(ServicesActions.getServices({
      page: this.config.currentPage, size: this.config.itemsPerPage
    }));
    this.store.dispatch(ServicesActions.getTotalCount());
  }

  closeNewServiceAddPopupEvent() {
    this.addNewVisible = false;
    this.clearNewServiceForm();
  }

  showNewServiceAddPopupEvent(){
    this.addNewVisible = true;
  }

  // tslint:disable-next-line:typedef
  handleFileInput(event: any) {
    this.fileRequired = false;
    this.imageFile = event.target.files[0] as File;
  }

  clearNewServiceForm() {
    this.serviceForm.reset()
    this.fileType.nativeElement.value = null;
    this.fileType2.nativeElement.value = null;
    this.imageFile = null;
  }

  submitNewService() {
    if(this.imageFile === null){
      this.fileRequired = true;
      return;
    }
    if(this.serviceForm.invalid){
      return;
    }
    this.store.dispatch(ServicesActions.addNewService({
      image: this.imageFile,
      category: this.serviceForm.value.category!,
      state: 'ACTIVE',
      title: this.serviceForm.value.title!,
      description: this.serviceForm.value.description!
    }))
  }

  addNewVisibleChanges(event: boolean) {
    this.addNewVisible = event;
  }

  clearSingleServiceViewPopupEvent() {
    this.singleServiceViewVisible = false;
  }

  handleSingleServiceViewVisibleChange($event: boolean) {
    this.singleServiceViewVisible = $event;
  }


  showUpEditPopup(service: ServicesInterface) {
    this.serviceForm = new FormGroup({
      title: new FormControl(service.title, [
        Validators.minLength(3),
        Validators.required
      ]),
      category: new FormControl(service.category, [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: new FormControl(service.description, [
        Validators.required
      ])
    });
    this.serviceEditPopupVisible = true;
    this.updatableServiceId = service._id;
  }

  handleServiceEditPopupVisibleChange($event: boolean) {
    this.serviceEditPopupVisible = $event;
  }

  submitUpdatedService() {
    if(this.imageFile === null){
      this.fileRequired = true;
      return;
    }
    if(this.serviceForm.invalid){
      return;
    }
    this.loadingSpinnerService = true;
    this.store.dispatch(ServicesActions.getUpdateServiceById({
      _id: this.updatableServiceId!,
      image: this.imageFile!,
      state: 'ACTIVE',
      title: this.serviceForm.value.title!,
      category: this.serviceForm.value.category!,
      description: this.serviceForm.value.description!,
    }));
  }


}

