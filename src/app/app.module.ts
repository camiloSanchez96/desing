import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeModule } from './nebular/@theme/theme.module';
import { NebularModule } from './nebular/nebular.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { MainComponent } from './container/main/main.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './container/footer/footer.component';
import { HeaderComponent } from './container/header/header.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DialogUpdateComponent } from './container/main/dialogs/dialog-update/dialog-update.component';
import { ErrorInterceptor } from './services/error-interceptor';
import { NbSidebarService, NbMenuService } from '@nebular/theme';
import { MomentPipe } from './services/pipes/moment.pipe';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartModule } from "angular2-chartjs";
import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";
// Angular material
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { GraphicsComponent } from './graphics-command/graphics/graphics.component';
import { DesignerComponent } from './designer/designer.component';
//NG5-Slider
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ContainerComponent,
    FooterComponent,
    HeaderComponent,
    DialogUpdateComponent,
    MomentPipe,
    GraphicsComponent,
    DesignerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'CSRF-Token',
    }),
    Ng2SmartTableModule,
    NebularModule,
    ThemeModule.forRoot(),
    NgbModalModule,
    NgbModule,
    DragDropModule,
    MatBottomSheetModule,
    NgApexchartsModule,
    Ng5SliderModule,
    ChartModule
  ],
  providers: [
    NbSidebarService, NbMenuService, MomentPipe,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
