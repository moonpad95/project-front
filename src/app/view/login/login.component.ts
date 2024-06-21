import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    this.authService.login(loginData).subscribe(
      (response) => {
        Swal.fire('Log correcto', `Bienvenido ${loginData.username} `, 'success');
        console.log('Su token es: ', response.token)
        this.router.navigate(['/']); // Navigate to dashboard or home page after successful login
      },
      (error) => {
        Swal.fire('Sin iniciar sesion', 'Revisa tus datos de acceso', 'error');
      }
    );
  }
}

