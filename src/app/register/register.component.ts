import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUser:RegisterUser = {userName: "", password: "", password2: ""};
  public warning:string = "";
  public success:boolean = false;
  public loading:boolean = false;
  requireName: FormControl= new FormControl();
  requirePassword: FormControl= new FormControl();

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    if(this.registerUser.userName && this.registerUser.password && this.registerUser.password2)
    {
      this.loading =  true;
      this.auth.register(this.registerUser).subscribe(
        (success) => {
          this.success = true;
          this.warning = "";
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }

  }

}
