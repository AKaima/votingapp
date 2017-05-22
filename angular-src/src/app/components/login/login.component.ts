import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService:AuthService, private router:Router, private fmSerivce:FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authUser(user).subscribe(data => {
      if(data.success)
      {
        this.authService.storeUser(data.token, data.user);
        this.fmSerivce.show("Successful login", {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['dashboard']);
      }
      else
      {
        this.fmSerivce.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }
}
