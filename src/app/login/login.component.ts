import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginUser:User = {userName: "", password: "", _id: ""};
  public warning:string = "";
  public loading:boolean = false;
  requireName: FormControl= new FormControl();
  requirePassword: FormControl= new FormControl();

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    if(this.loginUser.userName && this.loginUser.password)
    {
      this.loading =  true;
      this.auth.login(this.loginUser).subscribe(
        (success) => {
          this.warning = "";
          this.loading = false; 
           this.auth.setToken(success.token);
           this.router.navigate(['/newReleases']);
        },
        (err) => {
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }

  }
}
