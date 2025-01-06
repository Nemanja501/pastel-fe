import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserPageComponent } from './user-page/user-page.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ExploreComponent } from './explore/explore.component';
import { SearchComponent } from './search/search.component';
import { PostPageComponent } from './post-page/post-page.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'login', component: LoginComponent},
    {path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
    {path: 'explore', component: ExploreComponent, canActivate: [AuthGuard]},
    {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
    {path: 'post/:id', component: PostPageComponent, canActivate: [AuthGuard]},
    {path: 'user/:id', component: UserPageComponent, canActivate: [AuthGuard]},
    {path: 'user/edit/:id', component: EditUserComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];
