import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  title = 'CoreUI Free Angular Admin Template';

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }

}
