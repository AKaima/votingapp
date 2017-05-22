import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  vPassword: String;

  constructor(private validateService: ValidateService, private fmService: FlashMessagesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      vPassword: this.vPassword
    };
    
    if(!this.validateService.validateRegister(user))
    {
      this.fmService.show("Please fill in all fields", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    if(!this.validateService.validatePasswords(user.password, user.vPassword))
    {
      this.fmService.show("Passwords do not match", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email))
    {
      this.fmService.show("Email Invalid", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.fmService.show("Registration Successful", {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/login']);
      }
      else{
        this.fmService.show("Error registering", {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/register']);
      }
    });
  }
}
