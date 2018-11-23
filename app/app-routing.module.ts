import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AdhocFeedComponent } from './adhoc-feed/adhoc-feed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  { path: 'header', component: MenuComponent },
  { path: 'home', component: HomeComponent },
  { path: 'adhoceed', component: AdhocFeedComponent },
  { path: 'dashoard', component: DashboardComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
