import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
   <nb-layout windowMode>
      <nb-layout-header class="heightHeader" fixed>
        <app-header></app-header>
      </nb-layout-header>
      <nb-sidebar class="menu-sidebar" responsive=true>
      <nb-menu tag="menu" [items]="menu" ></nb-menu>
      </nb-sidebar>
      <nb-layout-column id="heatmapContainer" #heatmapContainer>
      <router-outlet></router-outlet>
      </nb-layout-column>
      <nb-layout-footer fixed>
        <app-footer></app-footer>
      </nb-layout-footer>
    </nb-layout>
    `,
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('heatmapContainer', { static: false, read: ElementRef }) heatmapContainer: ElementRef;
  menu: any = [];
  ngOnInit() {
    this.menu = [
      {
        title: 'Home',
        link: '/container/home',
        icon: 'calendar-outline'
      },
      {
        title: 'Report',
        link: '/container/home',
        icon: 'activity-outline'
      },
      {
        title: 'Backups',
        link: '/container/home',
        icon: 'briefcase-outline'
      },
      {
        title: 'Card',
        link: '/container/home',
        icon: 'credit-card-outline'
      },
      {
        title: 'files',
        link: '/container/home',
        icon: 'layers-outline'
      },
      {
        title: 'maps',
        link: '/container/home',
        icon: 'map-outline'
      },
      {
        title: 'images',
        link: '/container/home',
        icon: 'image-outline'
      }
    ];
  }

  ngAfterViewInit() {

  }

}

