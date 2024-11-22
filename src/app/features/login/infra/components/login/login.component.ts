import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { LoginUseCase } from '../../../application/login.usecase';
import { AplazoNoWhiteSpaceDirective } from '@apz/shared-ui';
import { AplazoLowercaseDirective } from '@apz/shared-ui';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../auth.service';
import { ROUTE_CONFIG } from '../../../../../core/infra/config/routes.config';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, AplazoButtonComponent, AplazoLogoComponent, CommonModule,AplazoNoWhiteSpaceDirective, AplazoLowercaseDirective],
})
export class LoginComponent {
  errorMessage: string = ''
  readonly loginUseCase = inject(LoginUseCase);
  private authService= inject(AuthService)
  readonly appRoutes = ROUTE_CONFIG;
  readonly #router = inject(Router);

  readonly username = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email ,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
  });

  readonly password = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly form = new FormGroup({
    username: this.username,
    password: this.password,
  });

  ngOnInit() {
    const isAuth = this.authService.isAuthenticatedM()
    if(isAuth){
      this.#router.navigate([ROUTE_CONFIG.app]);
    }
  }

  login(): void {
    if (this.form.valid) {
      this.authService.login() // se establecio aqui el prender la bandera del login por que siempre en el subscribe cae en el error
    this.loginUseCase
      .execute({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe({
        next: () => {
          // Éxito
          
        },
        error: (err) => {
        console.log(err);
        this.errorMessage = err?.message || 'Error desconocido';
          
        },
      });
    }
    else {
      this.errorMessage= 'Por favor, completa todos los campos correctamente.';
    }
  }



  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
