import { AuthInterceptor } from './guards/auth.interceptor';
import { UsersService } from 'src/app/services/users.service';
import { AuthGuard } from './guards/auth.guard';
import { RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CarListComponent } from './components/car-list/car-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginComponent } from './components/userComponents/login/login.component';
import { RegisterComponent } from './components/userComponents/register/register.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProfileComponent } from './components/userComponents/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserTabsComponent } from './components/userComponents/user-tabs/user-tabs.component';
import {MatTabsModule} from '@angular/material/tabs';
import { UserListComponent } from './components/adminComponents/user-list/user-list.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ImageUploadComponent } from './components/images/image-upload/image-upload.component';
import { NgxMaskModule } from 'ngx-mask';
import {MatDividerModule} from '@angular/material/divider';
import { CarListingComponent } from './components/car-listing/car-listing.component';
import { CarDetailedViewComponent } from './components/car-detailed-view/car-detailed-view.component';
import { ImageCarouselComponent } from './components/images/image-carousel/image-carousel.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { CarCommentComponent } from './components/car-comment/car-comment.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CarAddComponent } from './components/car-add/car-add.component';
import { MatTooltipModule} from '@angular/material/tooltip';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { UserCarsComponent } from './components/userComponents/user-cars/user-cars.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FooterComponent,
    UserTabsComponent,
    UserListComponent,
    ForbiddenComponent,
    ImageUploadComponent,
    CarListingComponent,
    CarDetailedViewComponent,
    ImageCarouselComponent,
    CarCommentComponent,
    CarFormComponent,
    CarAddComponent,
    CarEditComponent,
    UserCarsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: CarListComponent, pathMatch: 'full'},
      {path: 'Profile', component: ProfileComponent, pathMatch: 'full', canActivate:[AuthGuard]},
      {path: 'LoginRegister', component: UserTabsComponent, pathMatch: 'full'},
      {path: 'Forbidden', component: ForbiddenComponent, pathMatch: 'full'},
      {path: 'UserList', component: UserListComponent, pathMatch: 'full', canActivate:[AuthGuard], data : {permittedRoles: ['Admin']}},
      {path: 'Cars/:id', component: CarDetailedViewComponent},
      {path: 'NewListing', component: CarAddComponent, canActivate:[AuthGuard], data : {permittedRoles: ['User']}},
      {path: 'Cars/Edit/:id', component: CarEditComponent, canActivate:[AuthGuard], data : {permittedRoles: ['User']}},
      {path: 'UserCars', component: UserCarsComponent, canActivate:[AuthGuard], data : {permittedRoles: ['User']}}
    ]),
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    MatTabsModule,
    NgxMaskModule.forRoot(),
    MatDividerModule,
    IvyCarouselModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatTooltipModule
  ],
  providers: [UsersService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
