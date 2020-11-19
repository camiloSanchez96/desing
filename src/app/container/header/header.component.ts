import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { NbMenuService, NbSidebarService, NbThemeService, NbMediaBreakpointsService } from '@nebular/theme';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserInfo, ProfileMenu } from 'src/app/services/interfaces';
import { ObserversService } from 'src/app/services/observers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly = false;
  public showXL = true;
  user: any;
  private obsTheme: Subscription;
  public userInfo: UserInfo;
  currentTheme = 'default';

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  public profileMenu: ProfileMenu[] = [
    /*  {
        title: 'Profile',
        icon: { icon: 'user-circle', pack: 'fa' },
        target: 'main/profile',
      },*/
    {
      title: 'Log Out',
      icon: { icon: 'sign-out-alt', pack: 'fa' },
      target: 'login',
    },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private Login: LoginService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private observer: ObserversService,
  ) {
    this.obsTheme = this.observer.viewTheme().subscribe(res => {
      this.currentTheme = res;
    });
   }

  ngOnInit() {
    // const xl = this.breakpointService.getBreakpointsMap();
    // console.log(xl, 'verificando');

    this.currentTheme = this.themeService.currentTheme;
    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'menu-action'),
        map(({ item: { target } }) => target)
      )
      .subscribe((target) => {

        switch (target) {
          case 'login':
            this.Login.logout();
            this.router.navigate([target]);
            break;

          default:
            this.router.navigate([target]);
            break;
        }
      });

    this.userInfo = this.Login.getUser() ? this.Login.getUser() : { nombre: 'Camilo Sanchez', username: 'CamanSanchez' };

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => {
        this.userPictureOnly = isLessThanXl;
        this.showXL = !isLessThanXl;
        if (!isLessThanXl) {
          setTimeout(() => {
            this.toggleSidebar();
          }, 100);
        }
      });
    // setTimeout(() => {
    //   this.toggleSidebar();
    // }, 300);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.obsTheme) { this.obsTheme.unsubscribe(); }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

}
