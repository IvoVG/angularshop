import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  isLoggedIn = false;
  userForm: any={
    username: null,
    email: null,
    password: null,
    firstName:null,
    lastName: null,
    phoneNumber: null,
  }
  message = '';
  isSuccessful = false;
  isSignUpFailed = false;

  constructor(private storageService: StorageService,
   private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.userForm.userId=user.id;
      this.userForm.password= user.password;
      this.userForm.username=user.username;
      this.userForm.phoneNumber=user.phoneNumber;
      this.userForm.firstName= user.firstName;
      this.userForm.lastName= user.lastName;
      this.userForm.email=user.email;
    }
  }

  onSubmit(): void {
    const {firstName, lastName, phoneNumber, password} = this.userForm;
   const username=this.userForm.username;
   const email=this.userForm.email;
   const _id= this.userForm.userId;
    this.authService.updateUser(firstName, lastName, phoneNumber, username, email, password, _id).subscribe({
      next: data => {
        window.location.reload();
        console.log(data);
        this.isSuccessful = true;
      },
      error: err => {
        this.message = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
