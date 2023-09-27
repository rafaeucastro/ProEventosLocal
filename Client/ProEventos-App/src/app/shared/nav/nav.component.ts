import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  get showMenu() {
    return this.router.url != '/user/login' && this.router.url != '/user/registration';
  }

}
