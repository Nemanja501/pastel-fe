import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  profileLink: string = '';
  editProfileLink: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('userId') as string);
    this.profileLink = `/user/${userId}`;
    this.editProfileLink = `/user/edit/${userId}`
  }

  logout() {
    this.authService.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

}
