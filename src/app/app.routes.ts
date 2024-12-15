import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserPageComponent } from './user-page/user-page.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'login', component: LoginComponent},
    {path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
    {path: 'user/:id', component: UserPageComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];
