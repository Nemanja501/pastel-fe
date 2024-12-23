import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from "../../shared/components/error/error.component";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, CommonModule, ErrorComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{
  id: any = '';
  editUserErr: any = null;
  editUserForm = new FormGroup({
    userName: new FormControl(''),
    displayName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getEditUserData(this.id).subscribe({
      next: (response: any) => {
        console.log('get edit user res', response);
        this.editUserForm.get('userName')?.setValue(response.user.userName);
        this.editUserForm.get('displayName')?.setValue(response.user.displayName);
        this.editUserForm.get('email')?.setValue(response.user.email);
      },
      error: err => console.log('edit user err', err.message)
    })
  }

  onSubmit() {
    this.userService.putEditUser(this.editUserForm.value, this.id).subscribe({
      next: (response: any) =>{
        console.log('put edit user res', response);
        this.router.navigate([`/user/${this.id}`]);
      },
      error: err =>{
        console.log('err', err);
        this.editUserErr = err.error;
        this.editUserErr.data = err.error.data.map((item: any) => item.msg);
      }
    })
  }
}
