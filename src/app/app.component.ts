// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html'
// })
// export class AppComponent {

// }

import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  showHeader: boolean = true;
  showFooter: boolean = true;
  showSide: boolean = true;
  showSetting: boolean = true;

  selectedMenu: string = '';
  selectedSubMenu: string = '';

  

  constructor(
    private router: Router,
    private commonService: LoginService,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event: RouterEvent) => {

      if (event instanceof NavigationStart) {

      }

      if (event instanceof NavigationEnd) {
        this.showHeader = true;
        this.showFooter = false;
        this.showSide = true;
        this.showSetting = false;

        // console.log(this.route)
        this.selectedMenu = this.route.firstChild?.snapshot.data.menuId;
        this.selectedSubMenu = this.route.children[0]?.firstChild?.snapshot.data.subMenuId;

        if (this.commonService.hideHead.includes(event['url'])) {
          this.showHeader = false;
          this.showFooter = false;
        }
        if (this.commonService.hideNavSide.includes(event['url'])) {
          this.showHeader = false;
          this.showFooter = false;
          this.showSide = false;
        }
        if ('/brand/brand-profile/brand-first-update'.includes(event['url'])) {
          //this.showHeader = false;
          this.showFooter = false;
          this.showSide = false;
        }
        if (event['url'].includes('login')) {
          this.showHeader = false;
          this.showFooter = false;
          this.showSide = false;
        }
      }

      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {

      }
      if (event instanceof NavigationError) {

      }
    });
  }

}
