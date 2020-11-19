import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';
import { MainComponent } from './container/main/main.component';
import { LoginGuard } from './services/guards/login.guard';
import { ValidateLoginGuard } from './services/guards/validate-login.guard';
import {GraphicsComponent} from './graphics-command/graphics/graphics.component';
import {DesignerComponent} from './designer/designer.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'prefix' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'container',
    component: ContainerComponent,
    children: [
      {
        path: 'main',
        component: MainComponent,
        canActivate: [ValidateLoginGuard]
      },
      {
        path: 'home',
        component: DesignerComponent,
      },
      {
        path: 'graph',
        component: GraphicsComponent,
      },
    ]
  },
 
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
